import gql from 'graphql-tag'

// export const ALL_ORGANIZATIONS_QUERY = gql`
//   query AllOrganizationsQuery {
//     allOrganizations {
//       id
//       createdAt
//       name
//     }
//   }
// `

// export const GET_ORGANIZATION_QUERY = gql`
//   query Organization ($id: ID){
//     Organization(id: $id) {
//       id
//       name
//       phone
//       email
//       website
//     }
//   }
// `

export const CREATE_LOCATION_MUTATION = gql`
  mutation CreateLocationMutation($organizationId: ID, $opportunityId: ID, $name: String, $addressLine1: String, $city: String, $state: String, $zipcode: String) {
    createLocation(
      organizationId: $organizationId
      opportunityId: $opportunityId
      name: $name
      addressLine1: $addressLine1
      city: $city
      state: $state
      zipcode: $zipcode
    ) {
      id
    }
  }
`

// updateLocation(
//   addressLine1: $addressLine1
// ) {
//   id
// }
