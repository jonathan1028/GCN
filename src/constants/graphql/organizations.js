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

export const CREATE_ORGANIZATION_MUTATION = gql`
  mutation CreateOrganizationMutation($name: String) {
    createOrganization(
      name: $name
    ) {
      id
      createdAt
    }
  }
`
