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
              fileName
            }
          }
        }
        """

        response = requests.post(graphql_endpoint, json={'query': graphql_query, 'variables': {'ownerEmail': email}}, headers=headers)

        # Parse the GraphQL response
        graphql_data = response.json()
        print(graphql_data)
        #prompt = graphql_data['data']['TextDocument']['items'][0]['prompt']

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
