import axios from 'axios'
import { productsFail, productsRequest, productsSuccess } from '../slices/productsSlice'

export const getProducts = async (dispatch) => {
    try {
        dispatch(productsRequest())
        const response = await axios.get('/api/v1/products')
        const { data } = response;
        dispatch(productsSuccess(data))
    } catch (error) {
        dispatch(productsFail(error.response?.data?.message || 'An error occurred'))
    }
}
