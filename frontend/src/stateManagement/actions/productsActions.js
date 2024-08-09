import axios from 'axios'
import { productsFail, productsRequest, productsSuccess } from '../slices/productsSlice'

export const getProducts = async (dispatch) => {
    try {
        dispatch(productsRequest())
        const response = await axios.get('/api/v1/products')
        console.log(response); // Log the response to see its structure
        const { data } = response;
        dispatch(productsSuccess(data))
    } catch (error) {
        //handling error
        console.error(error); // Log the error for better debugging
        dispatch(productsFail(error.response?.data?.message || 'An error occurred'))
    }
}
