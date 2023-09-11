/* schema.graphql 
input AMPLIFY { globalAuthRule: AuthRule = { allow: public } } # FOR TESTING ONLY!

type TextDocument @model @auth(rules: [ { allow: public } ] ){
  id: ID!
  fileName: String!
  s3Key: String! # This stores the S3 object key
  # You can add more fields here, like the content of the document or metadata.
}
*/
import React, { useState } from 'react';
import { 
  withAuthenticator, 
  Button,
  View
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { API, Storage } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import './App.css';
// add mutations
import { 
  createTextDocument
} from './graphql/mutations';
import Header from './Header';
import Toolbar from './Toolbar'; 

const App = ({ signOut }) => {
  const [files, setFiles] = useState([]); // Use an array to store multiple files
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    const uploadedFiles = event.target.files;
    const filesArray = Array.from(uploadedFiles);
    setFiles(filesArray);
  };

  const uploadFiles = async () => {
    if (files.length === 0) {
      setErrorMessage('Please select one or more files to upload.');
      return;
    }

    try {
      const promises = files.map(async (file) => {
        // Generate a unique key for the file in S3
        const s3Key = `documents/${uuid()}_${file.name}`;

        // Upload the file to S3
        await Storage.put(s3Key, file, {
          contentType: file.type,
          bucket: 'transferlearnappdocumentstorage195302-staging'
        });

        // Create a new TextDocument in the GraphQL API
        const newDocument = await API.graphql({
          query: createTextDocument, 
          variables: {
            input: {
              fileName: file.name,
              s3Key: s3Key,
            },
          },
        });

        return newDocument.data.createTextDocument;
      });

      const uploadedDocuments = await Promise.all(promises);
      console.log('Uploaded and created documents:', uploadedDocuments);

      // Optionally, you can display a success message to the user
      setErrorMessage('Files uploaded successfully!');
    } catch (error) {
      console.error('Error uploading files:', error);
      // Display an error message to the user
      setErrorMessage('Error uploading files. Please try again later.');
    }
  };


  return (
    <div className="App">
      <Toolbar /> {/* Include the Toolbar component */}
      <Header /> {/* NEW */}
      <div className="container">Upload Text Documents</div>
      <div className="inputs">
        <input type="file" onChange={handleFileChange} multiple /> {/* Allow multiple file selection */}
        <button onClick={uploadFiles}>Upload</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
      <View>
        <Button onClick={signOut}>Sign Out</Button> 
      </View> 
    </div>
     );
}

export default withAuthenticator(App);
