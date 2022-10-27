import React, { useState } from 'react';
import './Login.css';

import authStore from '../utils/authStorage';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function doLogin(){
        authStore.login_(
            email.trim(),
            password.trim()
        ).then((response) => {
            console.log(response);
            authStore.set({
                user: response.user,
                accessToken: response.user.accessToken,
                userUID: response.user.uid,
                isLoggedIn: true,
                response: response._tokenResponse
            });
            alert("Login success!")

        }).catch((error) => {
            console.log(error);
        });
    }
    window.debug = {} || window.debug;
    window.debug.LoginState = {
        email: email,
        password: password,
        setEmail: setEmail,
        setPassword: setPassword,
        doLogin: doLogin
    }
    return (
        <>
            <div className='text-center'>
            <form class="form-signin">
                <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus onChange={
                    (event) => {
                        setEmail(event.target.value);
                    }
                } />
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" class="form-control" placeholder="Password" required onChange={(e) => {
                    setPassword(e.target.value);
                }} />
                <div class="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me" />
                    &nbsp; Remember me
                    </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit" onClick={(e) => {
                    e.preventDefault();
                    doLogin();
                }}>Sign in</button>
                </form>
            </div>
        </>
    )
}

export default Login;