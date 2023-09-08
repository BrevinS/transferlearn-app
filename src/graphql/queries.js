/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTextDocument = /* GraphQL */ `
  query GetTextDocument($id: ID!) {
    getTextDocument(id: $id) {
      id
      fileName
      s3Key
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTextDocuments = /* GraphQL */ `
  query ListTextDocuments(
    $filter: ModelTextDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTextDocuments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        fileName
        s3Key
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
