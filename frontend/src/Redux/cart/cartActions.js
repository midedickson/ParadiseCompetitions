import { ADD_TO_CART, REMOVE_ALL, REMOVE_FROM_CART, ERROR, FETCH_CART } from './cartTypes'
import { fetchMyCart, removeFromCart, addToCart } from '../../API/cartApi'

const addToCartSuccess = (payload) => {
    return {
        type: ADD_TO_CART,
        payload
    }
}

const fetchCartSuucess = (payload) => {
    return {
        type: FETCH_CART,
        payload
    }
}

const removeFromCartSuccess = (payload) => {
    return {
        type: REMOVE_FROM_CART,
        payload
    }
}

const errorOccurred = (payload) => {
    return {
        type: ERROR,
        payload
    }
}


export const addCompetition = (pk, ticket) => {
    return (dispatch) => {
        addToCart(pk, ticket)
            .then(async () => {
                const myCart = await fetchMyCart()
                return dispatch(addToCartSuccess(myCart))
            })
            .catch((error) => {
                alert(error.message)
                dispatch(errorOccurred(error))
            })
    }
}

export const fetchCart = () => {
    return (dispatch) => {
        fetchMyCart()
            .then(res => {
                return dispatch(fetchCartSuucess(res))
            })
    }
}

export const removeCompetition = (id) => {
    return (dispatch) => {
        console.log('clicekd')
        removeFromCart(id)
            .then(async () => {
                const myCart = await fetchMyCart()
                return dispatch(addToCartSuccess(myCart))
            })
            .catch((error) => {
                alert(error.message ? error.message : "An error occurred")
                dispatch(errorOccurred(error))
            })
    }
}

