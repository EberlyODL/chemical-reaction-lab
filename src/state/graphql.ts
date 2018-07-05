import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  clientState: {
    defaults: {
      isConnected: true,
      isLoaded: false
    },
    resolvers: {
      Mutation: {
        updateIsLoaded: (_:any, { isLoaded }, { cache }) => {
          cache.writeData({ data: { isLoaded }});
          return null;
        },
        updateNetworkStatus: (_:any, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected }});
          return null;
        }
      }
    }
  }
});