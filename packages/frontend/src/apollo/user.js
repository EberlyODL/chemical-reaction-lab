import gql from 'graphql-tag'
import client from "./client";

var USER_ID = null;

export const GET_LOCAL_USER = gql`
  query {
    localUser @client {
      userId
    }
  }
`

export const UPDATE_LOCAL_USER = gql`
  mutation($data: Object!) {
    updateLocalUser(data: $data) @client {
      userId
    }
  }
`

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

export const login = async () => {
  return new Promise(async (resolve, reject) => {
    // first check link state to see if we are logged in
    /**
     * @todo this is not working
     */
    if (USER_ID !== null) {
      resolve(USER_ID)
    }
    // if we aren't logged in yet then try to get it from browser storage
    let userId = localStorage.getItem('userId') || null
    // if we have a stored user id then check graphql to make sure
    if (userId) {
      const getUserResponse = await client.query({
        query: GET_USER,
        variables: {
          userId: userId
        }
      })
      try {
        if (getUserResponse.data.user.id) {
        }
      } catch (error) {
        userId = null
      }
    }
    // if we don't have an id then create one
    if (!userId) {
      await client.mutate({
        mutation: CREATE_USER,
        update: (store, { data: { createUser } }) => {
          // store the new userId in the browser cache
          localStorage.setItem('userId', createUser.id)
          userId = createUser.id
          USER_ID = createUser.id
        }
      })
    }
    resolve(userId)
  })
}