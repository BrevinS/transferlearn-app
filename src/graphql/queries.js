/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchTextDocuments = /* GraphQL */ `
  query SearchTextDocuments(
    $filter: SearchableTextDocumentFilterInput
    $sort: [SearchableTextDocumentSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableTextDocumentAggregationInput]
  ) {
    searchTextDocuments(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        fileName
        s3Key
        prompt
        ownerEmail
        createdAt
        updatedAt
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const getTextDocument = /* GraphQL */ `
  query GetTextDocument($id: ID!) {
    getTextDocument(id: $id) {
      id
      fileName
      s3Key
      prompt
      ownerEmail
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
        prompt
        ownerEmail
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
