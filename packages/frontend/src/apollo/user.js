import gql from 'graphql-tag'
import client from "./client";

const CREATE_USER = gql`
  mutation {
    createUser {
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