import gql from 'graphql-tag'
import client from "./client";
import { login } from './user'
import { Observable, from } from 'rxjs';
import { videoMatrix } from '../state/constants';
import { isEqual } from 'lodash'

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

export const $selectedObjects = Observable.create(async observer => {
  const userId = await login()
  client.watchQuery({
    query: GET_SELECTED_OBJECTS,
    variables: {
      id: userId
    }
  }).subscribe(({ data: { user: { selectedObjects } } }) => {
    observer.next(selectedObjects)
  })
})

export const selectObject = async (objectName) => {
  // get the current user id
  const userId = await login()
  const variables = {
    id: userId,
    objectName: objectName
  }
  // get the current selected Objects
  client.mutate({
    mutation: SELECT_OBJECT,
    variables,
    optimisticResponse: {
      __typename: "Mutation",
      updateUser: Object.assign({}, variables, { __typename: "Object", id: "optomistic_ui_id" } )
    },
  })
}

export const unselectObject = async (objectName) => {
  // get the current user id
  const userId = await login()
  const variables = {
    id: userId,
    objectName: objectName
  }
  const selectedObjectsQuery = await client.readQuery({
    query: GET_SELECTED_OBJECTS,
    variables
  })
  const objectIsSelected = selectedObjectsQuery.user.selectedObjects.find(i => i.name === objectName)
  if (objectIsSelected) {
    client.mutate({
      mutation: UNSELECT_OBJECT,
      variables,
      optimisticResponse: {
        __typename: "Mutation",
        updateUser: Object.assign({}, variables, { __typename: "Object", id: "optomistic_ui_id" } )
      },
    })
  }
}

/**
 * Finds a video combo from selected Objects state
 */
export const findVideo = (selectedObjects) => {
  const selectedObjectsNames = selectedObjects.map(i => i.name)
  const video = videoMatrix.find(v => isEqual(v.combination, selectedObjectsNames))
  return video
}