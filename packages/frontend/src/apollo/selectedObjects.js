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
        name
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
        name
      }
    }
  }
`

export const selectedObjects = async () => {
  const userId = await login()
  client.watchQuery({
    query: GET_SELECTED_OBJECTS,
    variables: {
      id: userId
    }
  }).subscribe(({ data: { user: { selectedObjects } } }) => {
    console.log('SELECTED_OBJECTS', selectedObjects);
  })
}

export const selectObject = async (objectName) => {
  // get the current user id
  const userId = await login()
  // get the current selected Objects
  client.mutate({
    mutation: SELECT_OBJECT,
    variables: {
      id: userId,
      objectName: objectName
    }
  })
}

export const unselectObject = async (objectName) => {
  // get the current user id
  const userId = await login()
  const selectedObjectsQuery = await client.readQuery({
    query: GET_SELECTED_OBJECTS,
    variables: {
      id: userId,
      objectName: objectName
    }
  })
  const objectIsSelected = selectedObjectsQuery.user.selectedObjects.find(i => i.name === objectName)
  if (objectIsSelected) {
    client.mutate({
      mutation: UNSELECT_OBJECT,
      variables: {
        id: userId,
        objectName: objectName
      }
    })
  }
}