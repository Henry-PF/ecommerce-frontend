import { GET_ALL_CATEGORIES, GET_ALL_PRODUCTS, SEARCH_PRODUCTS } from "./action-type";

const initialState = {
    produtcs: {},
    categories: {},
    filters: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                produtcs: action.payload,
            }
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            }
        case SEARCH_PRODUCTS:
            return {
                ...state,
                filters: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;