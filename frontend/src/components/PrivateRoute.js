import React from 'react'
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => 
                localStorage.getItem('isLoggedIn')  ? ( 
                    <Component {...rest} {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    )
}


export default PrivateRoute