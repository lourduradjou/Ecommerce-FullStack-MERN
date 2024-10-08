import { configureStore, combineReducers } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'
import productReducer from './slices/productSlice'

const reducer = combineReducers({
	productsState: productsReducer,
	productState: productReducer,
})

const store = configureStore({
	reducer,
})

export default store
