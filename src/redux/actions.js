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

export const createProcut = (formData) => async () => {
    console.log('REDUX', formData);
    try {
        const response = await axios.post('/productos', formData);
        console.log('Registro exitoso:', response.data);
    } catch (error) {
        console.error('Error en el registro:', error.message);
    }
};

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

export const buscarProductos = ({ nombre, categoria }) => {
    console.log(nombre, categoria);
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/filtros/search?nombre=${nombre}&categoria=${categoria}`);
            dispatch({
                type: SEARCH_PRODUCTS,
                payload: data.data
            });
        } catch (error) {
            console.error('Error al buscar productos:', error);
        }
    };
};