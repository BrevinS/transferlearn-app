import json
import os
import boto3
import botocore.exceptions
import requests
import slate3k as slate
import tempfile

s3_client = boto3.client('s3')

def lambda_handler(event, context):
    try:
        # Extract S3 bucket and key from the event
        s3_record = event['Records'][0]['s3']
        bucket = s3_record['bucket']['name']
        key = event['Records'][0]['s3']['object']['s3Key']
        
        # Extract username from the S3 key (assuming the format is 'username/document.txt')
        email=event['Records'][0]['s3']['object']['ownerEmail']
        
        headers = {
            'Content-Type': 'application/json',
            'x-api-key': 'da2-5zagxtv5dzf6pjry4qnbavzvj4'  # Include your API key in the headers
        }

        # Define your GraphQL endpoint
        graphql_endpoint = 'https://5725wbr2b5hf7cly6gy5b4vnba.appsync-api.us-west-2.amazonaws.com/graphql'

        # Make a GraphQL query to retrieve the prompt using the username
        graphql_query = """
        query GetFileNamesByOwnerEmail($ownerEmail: String!) {
          listTextDocuments(filter: {
            ownerEmail: {
              eq: $ownerEmail
            }
          }) {
            items {
              s3Key
            }
          }
        }
        """

        response = requests.post(graphql_endpoint, json={'query': graphql_query, 'variables': {'ownerEmail': email}}, headers=headers)

        # Parse the GraphQL response
        graphql_data = response.json()
        print(graphql_data)
        
        # Extract unique S3Keys and store them in a list
        s3_keys = list(set(item["s3Key"] for item in graphql_data["data"]["listTextDocuments"]["items"]))
        print('Raw S3 keys: ')
        print(s3_keys)
        visible_objects = filter_existing_objects(s3_keys)
        print('Concatenatable Objects = {}'.format(visible_objects))
        
        # Call the function to concatenate files based on the list of S3 keys
        concatenated_text = concatenate_files(visible_objects)
        print('Corpus String length: {} bytes'.format(len(concatenated_text)))
        
        return {
            'statusCode': 200,
            'body': json.dumps('Success')
        }
    except Exception as e:
        print(f'Error: {e}')
        return {
            'statusCode': 500,
            'body': json.dumps('Error')
        }
        
def filter_existing_objects(object_keys):
    existing_objects = []

    for key in object_keys:
        try:
            s3_client.head_object(Bucket='transferlearnappdocumentstorage195302-staging', Key='public/' + key)
            existing_objects.append(key)
        except Exception as e:
            # Handle exceptions for non-existent or inaccessible objects
            print(f"Object {key} does not exist or is not accessible: {e}")

    return existing_objects

def extract_text_from_pdf(pdf_key):
    try:
        # Download the PDF file from S3 to a temporary location
        temp_file_path = tempfile.mktemp()
        s3_client.download_file(Bucket='transferlearnappdocumentstorage195302-staging', Key='public/' + pdf_key, Filename=temp_file_path)

        # Initialize an empty string to store the extracted text
        extracted_text = ""

        # Open the downloaded PDF file using slate
        with open(temp_file_path, 'rb') as pdf_file:
            doc = slate.PDF(pdf_file)

            # Extract text from the PDF
            extracted_text = '\n'.join(doc)

        return extracted_text
    except Exception as e:
        # Handle any exceptions here
        raise e

# Function to concatenate text from a list of S3 keys
def concatenate_files(keys):
    bucket_name = 'transferlearnappdocumentstorage195302-staging'
    file_contents = []
    
    for key in keys:
        if key.lower().endswith('.pdf'):
            print('pdf key is {}'.format(key))
            # Extract text from PDF and append to the list
            pdf_text = extract_text_from_pdf(key)
            file_contents.append(pdf_text)
        elif key.lower().endswith('.txt'):
            # Read text directly from TXT file and append to the list
            print('text key is {}'.format(key))
            try:
                response = s3_client.get_object(Bucket=bucket_name, Key='public/' + key)
                txt_content = response['Body'].read().decode('latin-1')
                file_contents.append(txt_content)
            except botocore.exceptions.NoCredentialsError as e:
                # Handle the exception when the bucket is absent
                raise Exception("Bucket not found or access denied") from e

    # Concatenate all text contents into one long string
    concatenated_text = ' '.join(file_contents)

    return concatenated_text
    
