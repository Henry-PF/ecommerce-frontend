import axios from 'axios';
import { GET_ALL_CATEGORIES, GET_ALL_PRODUCTS, GET_TESTIMONIALS, SEARCH_PRODUCTS, SORT_PRICE } from './action-type';

export const getAllProducts = (page) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/productos?page=${page}`);
            console.log(data);
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: data
            });
        } catch (error) {
            console.error(error);
        }
    };
};


export const createProduct = (formData) => async () => {
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

export const buscarProductos = ({ nombre, categoria, precioMin, precioMax, page }) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/filtros/search?nombre=${nombre}&categoriaId=${categoria}&precioMin=${precioMin}&precioMax=${precioMax}&page=${page}`);
            dispatch({
                type: SEARCH_PRODUCTS,
                payload: data
            });
        } catch (error) {
            console.error('Error al buscar productos:', error);
        }
    };
};

export const getTestimonials = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('/reviews');
            dispatch({
                type: GET_TESTIMONIALS,
                payload: data
            })
        } catch (error) {
            console.error(error);
        }
    }
}

export const sortProducts = (orderBy) => {
    return {
        type: SORT_PRICE,
        payload: orderBy,
    };
};