import {ADD_TO_CART, REMOVE_FROM_CART,ERROR, FETCH_CART } from './cartTypes'
 
const initialState = {
    cart_items: [],
    cart_total: 0,
    coupon: null,
    error: null,
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            state = {
                ...state,
                ...action.payload
            }
            return state;
        case REMOVE_FROM_CART: 
            state = {
                ...state,
                ...action.payload
            }
            return state;
        case FETCH_CART: 
            state = {
                ...state,
               ...action.payload
            }
        case ERROR:
            state = {
                ...state,
                error: action.payload
            }
            return state;
        default:
            return state;
    }
}

export default cartReducer;
