import axios from "./axios"

const handleError = (err) => {
    const error = err.response
    if (error) throw error.data
    throw err
  }

export const fetchMyCart = () => {
    return axios.get('api/order_summary/')
        .then(res => res.data)
        .catch(handleError)
}

export const addToCart = (pk, ticket) => {
    return axios.post('api/add-competition-to-cart/', { pk, selected_ticket: ticket},{
    })
        .then(res => res.data)
        .catch(handleError)
}

export const removeFromCart = (id) => {
    return axios.post('api/remove-competition-from-cart/', { order_item_id: id })
        .then(res => res.data)
        .catch(handleError)
}