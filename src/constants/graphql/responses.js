import gql from 'graphql-tag'

export const ALL_RESPONSES_QUERY = gql`
query AllResponsesQuery {
  allResponses {
    id
    createdAt
    type
    ownedBy {
      id
      firstName
      lastName
    }
    opportunity {
      id
      name
    }
  }
}
`
export const CREATE_RESPONSE_MUTATION = gql`
mutation CreateResponseMutation($type: String, $ownedById: ID!, $opportunityId: ID!) {
  createResponse(
    type: $type
    ownedById: $ownedById
    opportunityId: $opportunityId
  ) {
    id
  }
}
`

export const DELETE_RESPONSE_MUTATION = gql`
mutation DeleteResponseMutation($id: ID!) {
  deleteResponse(
    id: $id,
  ) {
    id
  }
}
`
