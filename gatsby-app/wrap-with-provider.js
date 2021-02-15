import React from 'react'
import { Provider } from 'react-redux'

import createStore from './src/redux/store'

export default ({ element }) => {
    const store = createStore()
    return <Provider store={store}>{element}</Provider>
}