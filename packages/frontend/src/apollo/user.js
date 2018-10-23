import gql from 'graphql-tag'
import client from "./client";

const CREATE_USER = gql`
  mutation {
    createUser(data: {}) {
      id
    }
  }
`

const USER_ID = gql`
  query {
    user @client {
      id
    }
  }
`

// const GET_SELLECTED_OBJECTS = gql`
//   query($sessionID: String!) {
//     selectedObjects(where: { sessionID: $sessionID }) {
//       id
//     }
//   }
// `

const SELECT_OBJECT = gql`
  mutation($id: ID!, $objectName: String!) {
    updateUser(
      where: {
        id: $id
      },
      data:{
        selectedObjects:{
          connect: {
            name: $objectName
          }
        }
      }
    ) {
      id
    }
  }
`

const UNSELECT_OBJECT = gql`
  mutation($id: ID!, $objectName: String!) {
    updateUser(
      where: {
        id: $id
      },
      data:{
        selectedObjects:{
          disconnect: {
            name: $objectName
          }
        }
      }
    ) {
      id
    }
  }
`

export const login = () => {
  // login
  let userId = localStorage.getItem('userId') || null
  if (!userId) {
    client.mutate({
      mutation: CREATE_USER,
      update: (store, { data: { createUser } }) => {
        localStorage.setItem('userId', createUser.id)
        userId = createUser.id
      }
    })
  }
  return userId
}

export const selectedObjects = () => {
  // get the current user id
  client.watchQuery({
    query: USER_ID
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

export const selectObject = (objectName) => {
  // get the current user id
  client.watchQuery({
    query: USER_ID
  })
    .subscribe(({ data: { user: { id } } }) => {
      if (id) {
        // get the current selected Objects
        client.mutate({
          mutation: SELECT_OBJECT,
          variables: {
            id: id,
            objectName: objectName
          }
        })
      }
    })
}

export const unselectObject = (objectName) => {
  // get the current user id
  client.watchQuery({
    query: USER_ID
  })
    .subscribe(({ data: { user: { id } } }) => {
      if (id) {
        // get the current selected Objects
        client.mutate({
          mutation: UNSELECT_OBJECT,
          variables: {
            id: id,
            objectName: objectName
          }
        })
      }
    })
}