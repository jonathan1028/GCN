import gql from 'graphql-tag'

// ---------------------------------------------- Notifications ------------------------------------

export const ALL_NOTIFICATIONS_QUERY = gql`
  query AllNotificationsQuery {
    allNotifications {
      id
      message
      createdAt
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
