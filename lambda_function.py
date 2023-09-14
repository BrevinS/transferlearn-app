import json
import os
import boto3
import requests

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
        
        # Create a set to store the unique parts after the underscore
        unique_parts = set()

        # Initialize a list to store the filtered S3 keys
        filtered_s3_keys = []
        # Initialize a list to store the duplicate S3 keys
        duplicate_s3_keys = []

        # Iterate through the S3 keys and filter out duplicates
        for s3_key in s3_keys:
          # Extract the part after the underscore
          part_after_underscore = s3_key.split('_')[-1]
          # If the part is not in the set of unique parts, add it to the set and the filtered list
          if part_after_underscore not in unique_parts:
            unique_parts.add(part_after_underscore)
            filtered_s3_keys.append(s3_key)
          else:
            # If it's a duplicate, add it to the list of duplicates
            duplicate_s3_keys.append(s3_key)
        
        print('Duplicate Keys: ')
        print(duplicate_s3_keys)
        # Print the list of unique S3Keys
        print('S3 Keys of user {}'.format(email))
        # We now have the unique S3 keys of the users. 
        print(filtered_s3_keys)
        
        # Delete the duplicate files from the S3 bucket
        for duplicate_key in duplicate_s3_keys:
          s3_client.delete_object(Bucket=bucket, Key='public/' + duplicate_key)
  
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
