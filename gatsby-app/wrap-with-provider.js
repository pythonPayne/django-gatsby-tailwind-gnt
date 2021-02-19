import React from 'react'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client'

import { Provider } from 'react-redux'
import store from './src/redux/store'

const wrapRootElement = ({ element }) => {

    const client = new ApolloClient({
        uri: 'http://0.0.0.0:5000/graphql/',
        cache: new InMemoryCache()
      });
      
    // const store = createStore()

    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                {element}
            </Provider>        
        </ApolloProvider>
    )
}


export default wrapRootElement