
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

const AuthendicateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem("currentUser") ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

export default AuthendicateRoute;
