import React, { useEffect } from 'react';
import { connect }  from 'react-redux'
import { fetchCart, removeCompetition } from '../Redux/cart/cartActions'
import { Table } from 'react-bootstrap';

const Cart = ({ cart, fetchCart, removeCompetition }) => { 

    useEffect(() => {
        fetchCart()
    }, [])

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Competition</th>
                <th>Ticket</th>
                <th>Quantity</th>
                <th>Action</th>
                </tr>
            </thead>
        <tbody>
            {
                cart.map((val, i) => {
                    
                   return ( 
                        <tr style={{backgroundColor: 'white'}}>
                            <td>{val.id}</td>
                            <td> {val.competition} </td>
                            <td> {val.selected_ticket} </td>
                            <td>{val.quantity}</td>
                            <td><button onClick={() => removeCompetition(val.id)}>Remove</button></td>
                        </tr>
                    )
                })
            }
        </tbody>
        </Table>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart_items
    }
}

const mapDispatchToProps = {
    fetchCart,
    removeCompetition
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
