import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Alert } from 'reactstrap';
// import bcrypt from 'bcryptjs';
import axios from 'axios';
import { connect } from 'react-redux';


var jwt = require('jsonwebtoken');

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId: '',
            password: '',
            errorMessage: '',
        }
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        const that = this;
        axios({
            method: 'post',
            url: 'http://localhost:8080/employee/login',
            data: this.state
        }).then(function (response) {
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                var user = jwt.verify(response.data.token, 'secret');
                //   user.push(response.data.token)
                localStorage.setItem('currentUser', JSON.stringify(user));
                that.props.history.push('/admin/attendance');
            } else {
                console.log(response.data.message)
                that.setState({
                    errorMessage: response.data.message
                })

            }


        }).catch(function (error) {

            console.log(error);
        });

    };


    render() {
        return (
            <div className='regWrapper'>
                {/* <h1>{JSON.stringify(this.props.userdetails)}</h1> */}
                <div className='form-wrapper'>
                    <h3 className="head-design">

                        <img className="site-logo" alt="HDB logo" src="https://www.hdb.gov.sg/cs/infoweb/img/site-logo-small.jpg" />
                    </h3>
                    {this.state.errorMessage !== "" &&
                        <Alert color="danger">{this.state.errorMessage}</Alert>
                    }
                    <AvForm onValidSubmit={this.handleSubmit}>

                        <AvField name="employeeId" label="User Name" onChange={this.handleChange} type="text" validate={{
                            required: { value: true, errorMessage: 'Please enter a user name' },
                            pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers' },
                            minLength: { value: 6, errorMessage: 'Your name should be 6 characters' },
                            maxLength: { value: 6, errorMessage: 'Your name should be 6 characters' }
                        }} />
                        <AvField name="password" label="Password" onChange={this.handleChange} type="password" validate={{
                            required: { value: true, errorMessage: 'Please enter a password' },
                            minLength: { value: 6, errorMessage: 'Your name should be 6 characters' },

                        }} />
                        <Button className="buttonStyle">Submit</Button>

                        <div className="form-group" align="center">
                            <br /><a href="/signup" className="center">Create an account here</a> </div>
                    </AvForm>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userdetails: state.user
    }
}

export default connect(mapStateToProps)(Login);