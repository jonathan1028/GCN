import gql from 'graphql-tag'

// ----------------------------------------- Queries ---------------------------------------------
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

export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery($first: Int, $skip: Int, $orderBy: LinkOrderBy) {
    allLinks(first: $first, skip: $skip, orderBy: $orderBy) {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
    # gives you access to the count of the links
    _allLinksMeta {
      count
    }
  }
`

export const ALL_NOTIFICATIONS_QUERY = gql`
  query AllNotificationsQuery {
    allNotifications {
      id
      message
      createdAt
    }
  }
`

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

export const ALL_PEOPLE_QUERY = gql`
  query AllPersonsQuery {
    allPersons {
      id
      createdAt
      displayName
      firstName
      lastName
      phone1
      email
      ownedBy {
        id
        name
      }
    }
  }
`
export const ALL_OPPORTUNITIES_QUERY = gql`
  query AllOpportunitiesQuery {
    allOpportunities {
      id
      name
      description
      startTime
      endTime
      location
      ownedBy {
        id
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
      interestedUsers {
        id
        firstName
        lastName
      }
      goingUsers {
        id
        firstName
        lastName
      }
      attendedUsers {
        id
        firstName
        lastName
      }
    }
  }
`

export const ALL_VOLUNTEERING_LOGS_QUERY = gql`
  query AllVolunteeringLogsQuery {
    allVolunteeringLogs {
      id
      title
      description
      location
      startTime
      endTime
      ownedBy {
        id
        firstName
        lastName
      }
    }
  }
`

export const ALL_LINKS_SEARCH_QUERY = gql`
  query AllLinksSearchQuery($searchText: String!) {
    allLinks(filter: {
      OR: [{
        url_contains: $searchText
      }, {
        description_contains: $searchText
      }]
    }) {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`
// ----------------------------------------- Mutations ---------------------------------------------

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

export const CREATE_PERSON_MUTATION = gql`
  mutation CreatePersonMutation($displayName: String!, $firstName: String, $lastName: String, 
    $phone1: String, $email: String, $ownedById: ID!) {
    createPerson(
      displayName: $displayName,
      firstName: $firstName,
      lastName: $lastName,
      phone1: $phone1,
      email: $email,
      ownedById: $ownedById
    ) {
      id
      createdAt
      displayName 
      firstName
      lastName
      phone1
      email
      ownedBy {
        id
        name
      }
    }
  }
`

export const CREATE_NOTIFICATION_MUTATION = gql`
  mutation CreateNotificationMutation($message: String, $ownedById: ID!) {
    createNotification(
      message: $message
      ownedById: $ownedById
    ) {
      id
      message
      createdAt
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

export const ADD_INTEREST_TO_OPPORTUNITIES_MUTATION = gql`
  mutation addToInterestedOpportunities($interestedUsersUserId: ID!, 
  $interestedOpportunitiesOpportunityId: ID!) {
    addToInterestedOpportunities (
      interestedUsersUserId: $interestedUsersUserId
      interestedOpportunitiesOpportunityId: $interestedOpportunitiesOpportunityId
    ) {
      interestedOpportunitiesOpportunity {
        id
      }
    }
  }
`

export const ADD_GOING_TO_OPPORTUNITIES_MUTATION = gql`
  mutation addToGoingOpportunities($userId: ID!, 
  $opportunityId: ID!) {
    addToGoingOpportunities (
      goingUsersUserId: $userId
      goingOpportunitiesOpportunityId: $opportunityId
    ) {
      goingOpportunitiesOpportunity {
        id
      }
    }
  }
`

export const CREATE_OPPORTUNITY_MUTATION = gql`
  mutation CreateOpportunityMutation($name: String, $ownedById: ID!, $description: String, 
  $startTime: DateTime, $endTime: DateTime, $location: String) {
    createOpportunity(
      name: $name
      ownedById: $ownedById
      description: $description
      startTime: $startTime
      endTime: $endTime
      location: $location
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
    }
  }
`

export const CREATE_VOLUNTEERING_LOG_MUTATION = gql`
  mutation CreateVolunteeringLogMutation($title: String, $ownedById: ID!, $description: String, 
  $startTime: DateTime, $endTime: DateTime, $location: String) {
    createVolunteeringLog(
      title: $title
      ownedById: $ownedById
      description: $description
      location: $location
      startTime: $startTime
      endTime: $endTime
    ) {
      id
      title
      description
      location
      startTime
      endTime
      ownedBy {
        id
        firstName
        lastName
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

export const UPDATE_VOLUNTEERING_LOG_MUTATION = gql`
  mutation UpdateVolunteeringLogMutation($id: ID!, $title: String, $description: String, $location: String,
  $startTime: DateTime, $endTime: DateTime) {
    updateVolunteeringLog(
      id: $id,
      title: $title
      description: $description
      location: $location
      startTime: $startTime
      endTime: $endTime
    ) {
      id
      title
      description
      location
      startTime
      endTime
      ownedBy {
        id
        firstName
        lastName
      }
    }
  }
`

export const UPDATE_INTERESTED_USERS_MUTATION = gql`
  mutation UpdateOpportunityMutation($id: ID!, $firstName: String, $lastName: String, $description: String, 
  $startTime: DateTime, $endTime: DateTime, $address: String, $interestedUsersIds: [ID!]) {
    updateOpportunity(
      id: $id,
      firstName: $firstName
      lastName: $lastName
      description: $description
      startTime: $startTime
      endTime: $endTime
      address: $address
      interestedUsersIds: $interestedUsersIds
    ) {
      id
      name
      description
      startTime
      endTime
      address
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

export const UPDATE_PERSON_MUTATION = gql`
  mutation UpdatePersonMutation($id: ID!, $displayName: String!, $firstName: String, 
  $lastName: String, $phone1: String, $email: String) {
    updatePerson(
      id: $id,
      displayName: $displayName,
      firstName: $firstName,
      lastName: $lastName,
      phone1: $phone1, 
      email: $email
    ) {
      id
      displayName
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

export const DELETE_OPPORTUNITY_MUTATION = gql`
  mutation DeleteOpportunityMutation($id: ID!) {
    deleteOpportunity(
      id: $id,
    ) {
      id
    }
  }
`

export const DELETE_PERSON_MUTATION = gql`
  mutation DeletePersonMutation($id: ID!) {
    deletePerson(
      id: $id,
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

export const CREATE_LINK_MUTATION = gql`
  mutation CreateLinkMutation($description: String!, $url: String!, $postedById: ID!) {
    createLink(
      description: $description,
      url: $url,
      postedById: $postedById
    ) {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
    }
  }
`

export const CREATE_VOTE_MUTATION = gql`
  mutation CreateVoteMutation($userId: ID!, $linkId: ID!) {
    createVote(userId: $userId, linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`
// ----------------------------------------- Subscriptions ---------------------------------------------

export const NEW_PEOPLE_SUBSCRIPTION = gql`
  subscription {
    Person(filter: {
      mutation_in: [CREATED]
    }) {
      node {
        id
        createdAt
        displayName 
        firstName
        lastName
        phone1
        email
        ownedBy {
          id
        }
      }
    }
  }
`

export const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    Link(filter: {
      mutation_in: [CREATED]
    }) {
      node {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

export const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    Vote(filter: { mutation_in: [CREATED] }) 
    {
      node {
        id
        link {
          id
          url
          description
          createdAt
          postedBy {
            id
            name
          }
          votes {
            id
            user {
              id
            }
          }
        }
        user {
          id
        }
      }
    }
  }
`
