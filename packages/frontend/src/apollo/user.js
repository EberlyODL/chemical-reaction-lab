import gql from 'graphql-tag'
import client from "./client";

export const CREATE_USER = gql`
  mutation {
    createUser(data: {}) {
      id
    }
  }
`

export const GET_USER = gql`
  query($userId: ID!) {
    user(
      where: {
        id: $userId
      }
    ) {
      id
    }
  }
`

export const login = () => {
  return new Promise((resolve, reject) => {
    let userId = localStorage.getItem('userId') || null
    // if we have a stored user id then check graphql to make sure
    if (userId) {
      try {
        client.watchQuery({
          query: GET_USER,
          variables: {
            userId: userId
          }
        }).subscribe(({ data: { user } }) => {
          userId = id
        })
      } catch (error) {
        userId = null
      }
    }
    // if we don't have an id then create one
    if (!userId) {
      client.mutate({
        mutation: CREATE_USER,
        update: (store, { data: { createUser } }) => {
          console.log('createUser', createUser);
          localStorage.setItem('userId', createUser.id)
          userId = createUser.id
        }
      })
    }
    (userId)
  })
}