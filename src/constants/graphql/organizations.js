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
  $email: String, $website: String, $addressLine1: String, $city: String, $state: String, $zipcode: String) {
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
    ) {
      id
    }    
  }
`
