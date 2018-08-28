import gql from 'graphql-tag'

// ----------------------------------------- User ---------------------------------------------
export const ALL_USERS_QUERY = gql`
  query AllUsersQuery {
    allUsers {
      id
      firstName
      lastName
      email
      createdAt
      updatedAt
      medallions {
        id
        createdAt
        message
        category
        issuedBy {
          id
          firstName
          lastName
        }
        ownedBy {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const GET_USER_QUERY = gql`
  query User ($id: ID, $email: String){
    User(id: $id, email: $email) {
      id
      firstName
      lastName
      email
      birthYear
      phone
      medallions {
        id
      }
      preferences {
        id
        opportunitiesLocationRemote
        opportunitiesLocationOnsite
        opportunitiesOneTime
        opportunitiesRecurring
        opportunitiesEmailFrequency
      }
    }
  }
`

export const USERS_ON_FEED_QUERY = gql`
  query AllUsersQuery {
    allUsers {
      id
      firstName
      lastName
      email
      createdAt
      updatedAt
    }
  }
`

// Two mutations defined at once!
// the execution order is always from top to bottom.
// CreateUser mutation will be executed before the signinUser mutation.
// Bundling two mutations like this allows you to sign up and login in a single request!
export const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($firstName: String, $lastName: String, $email: String!, $password: String!) {
    createUser(
      firstName: $firstName,
      lastName: $lastName,
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }
    ) {
      id
    }

    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`

export const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const CREATE_USER_PREFERENCES_MUTATION = gql`
  mutation CreatePreferencesMutation(
      $ownedById: ID!,
      $opportunitiesLocationRemote: Boolean,
      $opportunitiesLocationOnsite: Boolean,
      $opportunitiesOneTime: Boolean,
      $opportunitiesRecurring: Boolean,
      $opportunitiesEmailFrequency: String
  ) {
    createPreferences(
      ownedById: $ownedById
      opportunitiesLocationRemote: $opportunitiesLocationRemote
      opportunitiesLocationOnsite: $opportunitiesLocationOnsite
      opportunitiesOneTime: $opportunitiesOneTime
      opportunitiesRecurring: $opportunitiesRecurring
      opportunitiesEmailFrequency: $opportunitiesEmailFrequency
    ) {
      id
    }
  }
`

export const UPDATE_USER_PREFERENCES_MUTATION = gql`
  mutation UpdatePreferencesMutation(
      $id: ID!,
      $opportunitiesLocationRemote: Boolean,
      $opportunitiesLocationOnsite: Boolean,
      $opportunitiesOneTime: Boolean,
      $opportunitiesRecurring: Boolean,
      $opportunitiesEmailFrequency: String
  ) {
    updatePreferences(
      id: $id,
      opportunitiesLocationRemote: $opportunitiesLocationRemote
      opportunitiesLocationOnsite: $opportunitiesLocationOnsite
      opportunitiesOneTime: $opportunitiesOneTime
      opportunitiesRecurring: $opportunitiesRecurring
      opportunitiesEmailFrequency: $opportunitiesEmailFrequency
    ) {
      id
    }
  }
`

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: ID!,  $firstName: String, $lastName: String, $phone: String, 
  $birthYear: String) {
    updateUser(
      id: $id,
      firstName: $firstName,
      lastName: $lastName,
      phone: $phone,
      birthYear: $birthYear,
    ) {
      id
      firstName
      lastName
    }
  }
`

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: ID!) {
    deleteUser(
      id: $id,
    ) {
      id
    }
  }
`
