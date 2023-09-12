import React, { useEffect, useState, useCallback } from 'react';
import { withAuthenticator, Button, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { API, Storage, Auth } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import './App.css';
import { createTextDocument } from './graphql/mutations';
import Header from './Header';
import Toolbar from './Toolbar';
import { useDropzone } from 'react-dropzone';

const App = ({ signOut }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    async function fetchUserEmail() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUserEmail(user.attributes.email);
      } catch (error) {
        console.error('Error fetching user email:', error);
        setUserEmail('Error fetching email'); // Handle the error as needed
      }
    }

    fetchUserEmail();
  }, []);

  const uploadFiles = useCallback(async () => {
    try {
      if (uploadedFiles.length === 0 || prompt.trim() === '') {
        // Check if files and prompt are provided
        setErrorMessage('Please add files and enter a prompt.');
        return;
      }

      const promises = uploadedFiles.map(async (file) => {
        // Generate a unique key for the file in S3
        const s3Key = `documents/${uuid()}_${file.name}`;

        // Upload the file to S3
        await Storage.put(s3Key, file, {
          contentType: file.type,
          bucket: 'transferlearnappdocumentstorage195302-staging',
        });

        // Create a new TextDocument in the GraphQL API
        const newDocument = await API.graphql({
          query: createTextDocument,
          variables: {
            input: {
              fileName: file.name,
              s3Key: s3Key,
              prompt: prompt, // Store the prompt in GraphQL
              ownerEmail: {userEmail} // Set the ownerEmail field
            },
          },
        });

        return newDocument.data.createTextDocument;
      });

      const uploadedDocuments = await Promise.all(promises);
      console.log('Uploaded and created documents:', uploadedDocuments);

      // Clear the list of uploaded files and prompt input
      setUploadedFiles([]);
      setPrompt('');

      // Optionally, you can display a success message to the user
      setErrorMessage('');
    } catch (error) {
      console.error('Error uploading files:', error);
      // Display an error message to the user
      setErrorMessage('Error uploading files. Please try again later.');
    }
  }, [uploadedFiles, prompt]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles); // Store uploaded files
    },
  });

  return (
    <div className="App">
      <Toolbar />
      <Header />
      <p>User Email: {userEmail}</p>
      <div className="container">Upload Text Documents</div>
      <div className="inputs">
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <input
          type="text"
          placeholder="Enter a prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={uploadFiles}>Upload Files and Prompt</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="file-list">
          <h2>Uploaded Files</h2>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <View>
        <Button onClick={signOut}>Sign Out</Button>
      </View>
    </div>
  );
};

export default withAuthenticator(App);
