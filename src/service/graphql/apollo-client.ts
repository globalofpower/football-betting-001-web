import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

const createLink = () => {
  const httpLink = new HttpLink({
    uri: import.meta.env.VITE_REACT_APP_GRAPHQL_ENDPOINT,
  });

  const authLink = new ApolloLink((operation, forward) => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token ? token : "",
      },
    }));

    return forward(operation);
  });

  return authLink.concat(httpLink);
};

const client = new ApolloClient({
  link: createLink(),
  cache: new InMemoryCache(),
});

export default client;
