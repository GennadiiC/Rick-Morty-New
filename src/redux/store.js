import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import rickMortyReducer from './rickMortySlice'


export const store = configureStore({
  reducer: {
    rickMorty: rickMortyReducer
  }

})


setupListeners(store.dispatch)