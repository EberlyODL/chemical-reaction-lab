import gql from 'graphql-tag'
import client from "./client";
import { USER_ID } from "./user";

export const GET_TRACKED_POSITIONS = gql`
  query($userId: ID!) {
    user(where: { id: $userId }) {
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

export const updateTrackedElement = ({ elementId, properties }) => {
  client.watchQuery({ query: USER_ID })
    .subscribe(({ data: { user: { id } } }) => {
      if (id) {
        client.mutate({
          mutation: UPDATE_TRACKED_ELEMENT,
          variables: {
            userId: id,
            // this is the unique name of the tracked element
            // segmented by user until this is fixed
            // https://github.com/prisma/prisma/issues/1300
            name: `${id}-${elementId}`,
            elementId: elementId,
            properties: properties
          }
        })
      }
    })
}

export const setElementsTrackedPositions = ({ scene }) => {
  client.watchQuery({ query: USER_ID })
    .subscribe(({ data: { user: { id } } }) => {
      if (id) {
        client.watchQuery({
          query: GET_TRACKED_POSITIONS,
          variables: {
            userId: id
          }
        })
          .subscribe(({ data: { user: { trackedElements } } }) => {
            if (trackedElements) {
              trackedElements.forEach(element => {
                const node = document.getElementById(element.elementId)
                if (node) {
                  for (let prop in element.properties) {
                    node.setAttribute(prop, element.properties[prop])
                  }
                }
              });
            }
          })
      }
    })
}

export const resetTrackedElements = () => {
  client.watchQuery({ query: USER_ID })
    .subscribe(({ data: { user: { id } } }) => {
      if (id) {
        client.mutate({
          mutation: RESET_TRACKED_ELEMENTS,
          variables: {
            userId: id,
          }
        })
      }
    })
}