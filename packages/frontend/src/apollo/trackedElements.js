import gql from 'graphql-tag'
import client from "./client";
import { login } from './user'

export const GET_TRACKED_POSITIONS = gql`
  query($userId: ID!) {
    user(where: { id: $userId }) {
      id
      trackedElements {
        elementId
        properties
      }
    }
  }
`

export const UPDATE_TRACKED_ELEMENT = gql`
  mutation($userId: ID!, $name: String!, $elementId: String!, $properties: Json!) {
    upsertTrackedElement(
      where: {
        name: $name
      },
      create: {
        name: $name,
        properties: $properties,
        elementId: $elementId,
        user: {
          connect: {
            id: $userId
          }
        }
      },
      update: {
        properties: $properties,
      }
    ) {
      id
    }
  }
`

export const RESET_TRACKED_ELEMENTS = gql`
  mutation($userId: ID!) {
    deleteManyTrackedElements(
      where: {
        user: {
          id: $userId
        }
      }
    ) {
      count
    }
  }
`

export const updateTrackedElement = async ({ elementId, properties }) => {
  const userId = await login()
  client.mutate({
    mutation: UPDATE_TRACKED_ELEMENT,
    variables: {
      userId: userId,
      // this is the unique name of the tracked element
      // segmented by user until this is fixed
      // https://github.com/prisma/prisma/issues/1300
      // ...actually i don't know if that's true.
      name: `${userId}-${elementId}`,
      elementId: elementId,
      properties: properties
    }
  })
}

export const setElementsTrackedPositions = async ({ scene }) => {
  const userId = await login()
  const variables = {
    userId: userId
  }
  try {
    const { data: { user: { trackedElements } } } = await client.query({
      query: GET_TRACKED_POSITIONS,
      variables
    })
    trackedElements.forEach(element => {
      const node = document.getElementById(element.elementId)
      if (node) {
        for (let prop in element.properties) {
          node.setAttribute(prop, element.properties[prop])
        }
      }
    })
  } catch (error) {
  }
}

export const resetTrackedElements = async () => {
  const userId = await login()
  client.mutate({
    mutation: RESET_TRACKED_ELEMENTS,
    variables: {
      userId: userId,
    }
  })
}