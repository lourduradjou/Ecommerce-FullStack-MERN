import axios from 'axios'
import {
	productFail,
	productRequest,
	productSuccess,
} from '../slices/productSlice'

export const getProduct = (id) => async (dispatch) => {
	try {
		dispatch(productRequest())
		const response = await axios.get(`/api/v1/product/${id}`)
		const { data } = response
		dispatch(productSuccess(data))
	} catch (error) {
		dispatch(
			productFail(error.response?.data?.message || 'An error occurred')
		)
	}
}
