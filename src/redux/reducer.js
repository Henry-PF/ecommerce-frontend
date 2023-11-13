import { GET_ALL_CATEGORIES, GET_ALL_PRODUCTS, GET_TESTIMONIALS, SEARCH_PRODUCTS, SORT_PRICE } from "./action-type";

const initialState = {
    products: [],
    categories: [],
    filters: [],
    reviews: [],
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
        case SORT_PRICE:
            const { products } = state;
            const orderBy = action.payload;

            let sortedRecipes = [];
            console.log('redux', products.precio);
            switch (orderBy) {
                case 'price_asc':
                    sortedRecipes = [...products].data?.sort((a, b) => b.precio - a.precio);
                    break;
                case 'price_desc':
                    sortedRecipes = [...products]?.sort((a, b) => a.precio - b.precio);
                    break;

                default:
                    return { ...state, }
            }

            return {
                ...state,
                products: sortedRecipes,
            };
        default:
            return state;
    }
}

export default rootReducer;