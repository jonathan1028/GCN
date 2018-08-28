import gql from 'graphql-tag'

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
