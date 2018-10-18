import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

export const UPDATE_NETWORK_STATUS = gql`
  mutation updateNetworkStatus($isConnected: Boolean) {
    updateNetworkStatus(isConnected: $isConnected) @client
  }
`

export const client = new ApolloClient({
  uri: "http://localhost:4466",
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