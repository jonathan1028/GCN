import gql from 'graphql-tag'

// ----------------------------------------- Opportunities ---------------------------------------------

export const ALL_OPPORTUNITIES_QUERY = gql`
  query AllOpportunitiesQuery {
    allOpportunities {
      id
      name
      description
      startTime
      endTime
      ownedBy {
        id
      }
      location {
        id
        name
        addressLine1
        city
        state
        zipcode
      }
      organization {
        id
        volunteers {
          id
          firstName
        }
      }
      responses {
        id
        createdAt
        type
        ownedBy {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const CREATE_OPPORTUNITY_MUTATION = gql`
  mutation CreateOpportunityMutation($name: String, $ownedById: ID!, $organizationId: ID!, $description: String, 
  $startTime: DateTime, $endTime: DateTime) {
    createOpportunity(
      name: $name
      ownedById: $ownedById
      organizationId: $organizationId
      description: $description
      startTime: $startTime
      endTime: $endTime
    ) {
      id
      name
      description
      startTime
      endTime
      ownedBy {
        id
        firstName
        lastName
      }
      responses {
        id
        createdAt
        type
        ownedBy {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const UPDATE_OPPORTUNITY_MUTATION = gql`
  mutation UpdateOpportunityMutation($id: ID!, $name: String, $description: String, 
  $startTime: DateTime, $endTime: DateTime, $location: String, $interestedUsersIds: [ID!]) {
    updateOpportunity(
      id: $id,
      name: $name
      description: $description
      startTime: $startTime
      endTime: $endTime
      location: $location,
      interestedUsersIds: $interestedUsersIds
    ) {
      id
      name
      description
      startTime
      endTime
      location
      ownedBy {
        id
        firstName
        lastName
      }
      interestedUsers {
        id
        firstName
        lastName
      }
    }
  }
`

export const DELETE_OPPORTUNITY_MUTATION = gql`
  mutation DeleteOpportunityMutation($id: ID!) {
    deleteOpportunity(
      id: $id,
    ) {
      id
    }
  }
`
