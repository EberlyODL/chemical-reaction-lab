import { ApolloClient, gql } from 'apollo-boost';

export const UPDATE_NETWORK_STATUS = gql`
  mutation updateNetworkStatus($isConnected: Boolean) {
    updateNetworkStatus(isConnected: $isConnected) @client
  }
`

export const client = new ApolloClient({
  uri: 'https://fakerql.com/graphql',
  clientState: {
    defaults: {
      isConnected: true
    },
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          const data = {
            networkStatus: {
              __typename: 'NetworkStatus',
              isConnected
            },
          };
          cache.writeData({ data });
          return null
        },
      },
    }
  }
});