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

const App = ({ signOut }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const uploadFile = async () => {
    if (file) {
      try {
        // Generate a unique key for the file in S3
        const s3Key = `documents/${uuid()}_${file.name}`;

        // Upload the file to S3
        await Storage.put(s3Key, file, {
          contentType: file.type,
        });

        // Create a new TextDocument in the GraphQL API
        const newDocument = await API.graphql({
          query: `
            mutation CreateTextDocument($fileName: String!, $s3Key: String!) {
              createTextDocument(input: {
                fileName: $fileName,
                s3Key: $s3Key
              }) {
                id
                fileName
                s3Key
              }
            }
          `,
          variables: {
            fileName: file.name,
            s3Key: s3Key,
          },
        });

        console.log('Uploaded and created document:', newDocument.data.createTextDocument);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div>
      <h1>Upload Text Document</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>
    <View>
      <Button onClick={signOut}>Sign Out</Button> 
    </View> 
    </div>
     );
}

export default withAuthenticator(App);
