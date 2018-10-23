import client from './client'
import gql from 'graphql-tag'

const GET_USER_ID = gql`
  query {
    user @client {
      id
    }
  }
`

const GET_SELLECTED_OBJECTS = gql`
  query($sessionID: String!) {
    selectedObjects(where: { sessionID: $sessionID }) {
      id
    }
  }
`

const SELECT_OBJECT = gql`
  mutation($data: SelectedObjectCreateInput!) {
    createSelectedObject(data: $data) {
      id
    }
  }
`

export const selectedObjects = () => {
  // get the current user id
  client.watchQuery({
    query: GET_USER_ID
  })
    .subscribe(({ data: { user: { id } } }) => {
      // get the current selected Objects
      client.watchQuery({
        query: GET_SELLECTED_OBJECTS,
        variables: {
          sessionID: id
        }
      })
        .subscribe(({ data: { selectObjects } }) => {
        })
    })
}

export const selectObject = (objectId) => {
  // get the current user id
  client.watchQuery({
    query: GET_USER_ID
  })
    .subscribe(({ data: { user: { id } } }) => {
      if (id) {
        // get the current selected Objects
        client.mutate({
          mutation: SELECT_OBJECT,
          variables: {
            data: {
              sessionID: id,
              object: {
                connect: {
                  name: objectId
                }
              }
            }
          }
        })
      }
    })
}