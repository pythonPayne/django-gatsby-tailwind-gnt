// import { createStore as reduxCreateStore } from "redux"
// import rootReducer from './reducers'

// const createStore = () => reduxCreateStore(rootReducer)

// export default createStore

import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const store = configureStore({
  reducer: rootReducer
})

export default store