import gql from 'graphql-tag'

export const ALL_ORGANIZATIONS_QUERY = gql`
  query AllOrganizationsQuery {
    allOrganizations {
      id
      createdAt
      name
    }
  }
`

export const GET_ORGANIZATION_QUERY = gql`
  query Organization ($id: ID){
    Organization(id: $id) {
      id
      name
      phone
      email
      website
      location {
        id
        addressLine1
        city
        state
        zipcode
      }
      personnel {
        id
        firstName
        lastName
      }
      opportunities {
        id
        name
        description
        startTime
        endTime
        location {
          id
          name
          addressLine1
          city
          state
          zipcode
        }
        responses {
          id
          ownedBy {
            id
            firstName
            lastName
          }
        }
      }
      volunteers {
          id
          firstName
          lastName
          email
          phone
        }
    }
  }
`

export const ADD_VOLUNTEER_MUTATION = gql`
  mutation AddToVolunteersOnOrganization ($volunteersUserId: ID!, $volunteeredAtOrganizationId: ID!){
    addToVolunteersOnOrganization(
      volunteersUserId: $volunteersUserId 
      volunteeredAtOrganizationId: $volunteeredAtOrganizationId
    ) {
      volunteersUser {
        id
      }
      volunteeredAtOrganization {
        id
      }
    }
  }
`

export const CREATE_ORGANIZATION_MUTATION = gql`
  mutation CreateOrganizationMutation($name: String, $personnelIds: [ID!]) {
    createOrganization(
      personnelIds: $personnelIds
      name: $name
    ) {
      id
      createdAt
    }
  }
`

export const UPDATE_ORGANIZATION_MUTATION = gql`
  mutation UpdateOrganizationMutation($id: ID!,  $name: String, $phone: String, 
  $email: String, $website: String, $addressLine1: String, $city: String, $state: String, $zipcode: String,
  $volunteersIds: [ID!]) {
    updateOrganization(
      id: $id,
      name: $name
      phone: $phone,
      email: $email,
      website: $website,
      location: {
        addressLine1: $addressLine1
        city: $city
        state: $state
        zipcode: $zipcode
      }
      volunteersIds: $volunteersIds
    ) {
      id
    }    
  }
`
