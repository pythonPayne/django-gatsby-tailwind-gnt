import React from 'react'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

import { Provider } from 'react-redux'
import store from './src/redux/store'

const wrapRootElement = ({ element }) => {

    const httpLink = createHttpLink({
        uri: 'http://0.0.0.0:5000/graphql/',
    })
  
    const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
        ...headers,
        authorization: token ? `JWT ${token}` : "",
        }
    }
    })

    const client = new ApolloClient({                
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
      })

    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                {element}
            </Provider>        
        </ApolloProvider>
    )
}


export default wrapRootElement
