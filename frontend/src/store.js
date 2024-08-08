import { configureStore, combineReducers } from '@reduxjs/toolkit'
import productsReducer from './components/slices/productsSlice'
import { thunk } from 'redux-thunk'

const reducer = combineReducers({
	productsState: productsReducer,
})

const store = configureStore({
	reducer,
})

export default store
