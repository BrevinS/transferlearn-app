/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTextDocument = /* GraphQL */ `
  mutation CreateTextDocument(
    $input: CreateTextDocumentInput!
    $condition: ModelTextDocumentConditionInput
  ) {
    createTextDocument(input: $input, condition: $condition) {
      id
      fileName
      s3Key
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTextDocument = /* GraphQL */ `
  mutation UpdateTextDocument(
    $input: UpdateTextDocumentInput!
    $condition: ModelTextDocumentConditionInput
  ) {
    updateTextDocument(input: $input, condition: $condition) {
      id
      fileName
      s3Key
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTextDocument = /* GraphQL */ `
  mutation DeleteTextDocument(
    $input: DeleteTextDocumentInput!
    $condition: ModelTextDocumentConditionInput
  ) {
    deleteTextDocument(input: $input, condition: $condition) {
      id
      fileName
      s3Key
      createdAt
      updatedAt
      __typename
    }
  }
`;
