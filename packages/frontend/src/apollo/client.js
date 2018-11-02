import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { withClientState } from 'apollo-link-state';
import { GET_LOCAL_USER } from './user';

// Create an http link:
const httpLink = new HttpLink({
  uri: `${process.env.GRAPHQL_HTTP_URL}`,
})

// Create a Websocket link;
const wsLink = new WebSocketLink({
  uri: `${process.env.GRAPHQL_WS_URL}`,
  options: {
    reconnect: false
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const httpWsLink = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

// This is the same cache you pass into new ApolloClient
const cache = new InMemoryCache();

// set up link state for local
const stateLink = withClientState({
  cache,
  defaults: {
  },
  resolvers: {
  }
});

export default new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    stateLink,
    httpWsLink
  ]),
  cache: cache,
  connectToDevTools: (process.env.DEVELOPMENT)
});