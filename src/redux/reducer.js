import { GET_ALL_CATEGORIES, GET_ALL_PRODUCTS, GET_TESTIMONIALS, SEARCH_PRODUCTS, SORT_PRICE, GET_FAVORITES } from "./action-type";

const initialState = {
    products: [],
    categories: [],
    filters: [],
    reviews: [],
    user: {},
    favorites: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            }
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            }
        case SEARCH_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case GET_TESTIMONIALS:
            return {
                ...state,
                reviews: action.payload
            }
        case GET_FAVORITES:
            return {
                ...state,
                favorites: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;