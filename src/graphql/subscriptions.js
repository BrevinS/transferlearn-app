/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTextDocument = /* GraphQL */ `
  subscription OnCreateTextDocument(
    $filter: ModelSubscriptionTextDocumentFilterInput
  ) {
    onCreateTextDocument(filter: $filter) {
      id
      fileName
      s3Key
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTextDocument = /* GraphQL */ `
  subscription OnUpdateTextDocument(
    $filter: ModelSubscriptionTextDocumentFilterInput
  ) {
    onUpdateTextDocument(filter: $filter) {
      id
      fileName
      s3Key
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTextDocument = /* GraphQL */ `
  subscription OnDeleteTextDocument(
    $filter: ModelSubscriptionTextDocumentFilterInput
  ) {
    onDeleteTextDocument(filter: $filter) {
      id
      fileName
      s3Key
      createdAt
      updatedAt
      __typename
    }
  }
`;
