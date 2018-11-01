import gql from 'graphql-tag'
import client from "./client";
import { login } from './user'

export const GET_SELECTED_OBJECTS = gql`
  query($id: ID!) {
    user(
      where: {
        id: $id
      }
    ) {
      id
      selectedObjects {
        id
        name
      }
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
      selectedObjects {
        id
      }
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
      selectedObjects {
        id
      }
    }
  }
`

export const selectedObjects = async () => {
  const userId = await login()
  console.log('userId', userId);
  client.watchQuery({
    query: GET_SELECTED_OBJECTS,
    variables: {
      id: userId
    }
  }).subscribe(({ data: { user: { selectedObjects } } }) => {
    console.log('Currently Selected', selectedObjects);
  })
}

export const selectObject = async (objectName) => {
  // get the current user id
  const userId = await login()
  // get the current selected Objects
  try {
    client.mutate({
      mutation: SELECT_OBJECT,
      variables: {
        objectPositionId: `${userId}-${objectName}`,
        id: userId,
        objectName: objectName
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export const unselectObject = async (objectName) => {
  // get the current user id
  const userId = await login()
  try {
    client.mutate({
      mutation: UNSELECT_OBJECT,
      variables: {
        objectPositionId: `${userId}-${objectName}`,
        id: userId,
        objectName: objectName
      }
    })
  } catch (error) {
    console.error(error)
  }
}