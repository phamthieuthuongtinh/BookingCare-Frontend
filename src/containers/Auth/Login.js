import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            else if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log(error.response);
        }
    }
    // ham show password danh cho bootstap 4
    // handleShowHidePassword = () => {
    //     this.setState({
    //         isShowPassword: !this.state.isShowPassword
    //     })
    // }
    render() {

        return (
            <div className="login-background ">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">
                            Login
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Username</label>
                            <input type='text' className='form-control' name='username' value={this.state.username} placeholder='Username' onChange={(event) => { this.handleOnChangeUsername(event) }} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            {/* bootstrap 4 can viet ham de show password */}
                            {/* <div className='custom-input-password'>

                                <input type={this.state.isShowPassword ? 'text :' : 'password'} className='form-control' name='password' placeholder='Password' onChange={(event) => { this.handleOnChangePassword(event) }} />
                                <span onClick={() => { this.handleShowHidePassword() }}>
                                    <i className={this.state.isShowPassword ? 'far fa eye' : 'far fa eye-slash'}></i>
                                </span>

                            </div> */}
                            <input type='password' className='form-control' name='password' placeholder='Password' value={this.state.password}
                                onChange={(event) => { this.handleOnChangePassword(event) }} />
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button>
                        </div>

                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-orther-login'>
                                Or login with:
                            </span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className='fab fa-google-plus-g gg'></i>
                            <i className='fab fa-facebook-f fb'></i>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
