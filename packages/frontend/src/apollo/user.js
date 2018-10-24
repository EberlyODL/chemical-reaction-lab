import gql from 'graphql-tag'
import client from "./client";

export const CREATE_USER = gql`
  mutation {
    createUser(data: {}) {
      id
    }
  }
`

export const USER_ID = gql`
  query {
    user @client {
      id
    }
  }
`

export const SELECT_OBJECT = gql`
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

export const UNSELECT_OBJECT = gql`
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

export const UPDATE_OBJECT_POSITION = gql`
  mutation($objectPositionName: String!, $userId: ID!, $objectName: String!, $position: Json!) {
    upsertObjectPosition(
      where: {
        name: $objectPositionName
      },
      create: {
        name: $objectPositionName,
        position: $position
        object: {
          connect: {
            name: $objectName
          }
        },
        user: {
          connect: {
            id: $userId
          }
        }
      },
      update: {
        position: $position
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
            objectPositionId: `${id}-${objectName}`,
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