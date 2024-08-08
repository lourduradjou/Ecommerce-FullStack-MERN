import { configureStore, combineReducers } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'
import { thunk } from 'redux-thunk'

const reducer = combineReducers({
	productsState: productsReducer,
})

const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store
