import gql from 'graphql-tag'

export const ALL_MEDALLIONS_QUERY = gql`
  query AllMedallionsQuery {
    allMedallions {
      id
      createdAt
      message
      category
      ownedBy {
        firstName
        lastName
      }
      issuedBy {
        firstName
        lastName
      }
    }
  }
`

export const CREATE_MEDALLION_MUTATION = gql`
  mutation CreateMedallionMutation($ownedById: ID!, $issuedById: ID!, $message: String, $category: String ) {
    createMedallion(
      ownedById: $ownedById
      issuedById: $issuedById
      message: $message
      category: $category
    ) {
      id
      createdAt
    }
  }
`
