import React, { Component } from 'react';
//import axios from 'axios';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './containers/Login';
import Register from './containers/Register';
// import Profile from './containers/Profile';
// import Sample from './containers/sample';
import NoMatch from './components/NoMatch';
import withAuth from './withAuth';
import AdminLayout from "layouts/Admin.jsx";
import AuthendicateRoute from './AuthendicateRoute';

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/signup" component={withAuth(Register)} />

                    {/* <Route exact path="/profile" component={Profile} /> */}
                    <AuthendicateRoute path="/admin" render={props => (<AdminLayout {...props} />)} />
                    {/* <Route exact path="/sample" component={Sample} /> */}
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        );
    }
}

export default App;