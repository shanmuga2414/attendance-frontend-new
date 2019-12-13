import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Alert } from 'reactstrap';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { connect } from 'react-redux';
import { saveUser } from '../redux/actions'



class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            employeeId: '',
            team: '',
            password: '',
            confirmPassword: '',
            errorMessage: ''
        }
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        // e.preventDefault();
        this.props.saveUser(this.state);
        const that = this;
        const password = this.state.password;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        this.setState({
            password: hash,
            confirmPassword: hash
        })
        axios({
            method: 'post',
            url: 'http://localhost:8080/employee/register',
            data: this.state
        }).then(function (response) {
            if (response.status === 200) {
                that.props.history.push('/');
            } else {
                console.log(response.data.message)
                that.setState({
                    errorMessage: response.data.message
                })
            }
        })
            .catch(function (error) {
                console.log(error);
            });

    };


    render() {

        return (
            <div className='regWrapper'>
                <div className='form-wrapper'>
                    <h3 className="head-design">
                        <img className="site-logo" alt="HDB logo" src="https://www.hdb.gov.sg/cs/infoweb/img/site-logo-small.jpg" />
                    </h3>
                    {this.state.errorMessage !== "" &&
                        <Alert color="danger">{this.state.errorMessage}</Alert>
                    }
                    <AvForm onValidSubmit={this.handleSubmit}>


                        <AvField name="name" label="Name" type="text" onChange={this.handleChange} validate={{
                            required: { value: true, errorMessage: 'Please enter a user name' },
                        }} />
                        <AvField name="employeeId" label="Employee ID" type="text" onChange={this.handleChange} validate={{
                            required: { value: true, errorMessage: 'Please enter the employee ID' },
                            pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Your id must be composed only with letter and numbers' },
                            minLength: { value: 6, errorMessage: 'Your id should be 6 characters' },
                            maxLength: { value: 6, errorMessage: 'Your id should be 6 characters' }
                        }} />

                        <AvField type="select" name="team" onChange={this.handleChange} label="Select Team" validate={{
                            required: { value: true, errorMessage: 'Please select the team' },
                        }}>
                            <option>Select Team</option>
                            <option>OS</option>
                            <option>EUS</option>
                            <option>FAS</option>

                        </AvField>

                        <AvField name="password" id="password" label="Password" onChange={this.handleChange} type="password" validate={{
                            required: { value: true, errorMessage: 'Please enter a password' },
                            minLength: { value: 6, errorMessage: 'Your name should be 6 characters' },

                        }} />
                        <AvField name="confirmPassword" label="Confirm Password" onChange={this.handleChange} type="password"
                            validate={{
                                required: { value: true, errorMessage: 'Please enter a confirm password' },
                                match: { value: 'password', errorMessage: "Password doesn't match!" },
                            }} />
                        <Button className="buttonStyle">Submit</Button>
                        <div className="form-group" align="center">
                            <br /><a href="/" className="center">Login here</a> </div>
                    </AvForm>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        saveUser: (payload) => dispatch(saveUser(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
