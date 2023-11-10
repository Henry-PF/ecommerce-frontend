import axios from 'axios';
import { GET_ALL_CATEGORIES, GET_ALL_PRODUCTS, SEARCH_PRODUCTS } from './action-type';

export const getAllProducts = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('/productos');
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: data.data,
            })
        } catch (error) {
            console.error(error);
        }
    }
}

export const getAllCategories = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('/categorias');
            dispatch({
                type: GET_ALL_CATEGORIES,
                payload: data.data,
            })
        } catch (error) {
            console.error(error);
        }
    }
}

export const buscarProductos = (filtros) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('/api/filtros', filtros);
            dispatch({
                type: SEARCH_PRODUCTS,
                payload: data
            });
        } catch (error) {
            console.error('Error al buscar productos:', error);
        }
    };
};