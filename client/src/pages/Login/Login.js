import React, { useState } from 'react';
import axios from 'axios';

import './Login.css';
import logo from '../../assets/images/checkLogo.svg';

export default ({history}) => {
  const [loginData, setloginData] = useState({email: '', password: ''});
  const [signupData, setSignupData] = useState({firstName: '', lastName: '', email: '', password: ''});

  const setToken = (token) => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }

    localStorage.setItem('token', token);
  }

  const clearForms = () => {
    setloginData({email: '', password: ''});
    setSignupData({firstName: '', lastName: '', email: '', password: ''});
  }

  const handleLoginChange = (event) => {
    const newloginData = {...loginData};
    newloginData[event.target.name] = event.target.value;
    setloginData(newloginData);
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios({
        method: 'post',
        url: '/api/login',
        data: {
          email: loginData.email,
          password: loginData.password
        }
      });
      setToken(res.data.token);
      history.push(`/users/${res.data.id}/lists`);
      document.location.reload();
    } catch (err) {
      console.log(err.response);
    }
  }

  const handleSignUpChange = (event) => {
    const newSignupData = {...signupData};
    newSignupData[event.target.name] = event.target.value;
    setSignupData(newSignupData);
  }

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    const {firstName, lastName, email, password} = signupData;
    try {
      const res = await axios({
        method: 'post',
        url: '/api/users',
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        }
      });
      setToken(res.data.token);
      history.push(`/users/${res.data.id}/lists`)
      document.location.reload();
    } catch (err) {
      console.log(err.response);
    }
  }
  
  return (
    <div className="Login">
      <header className="login-header">
         <img src={logo} alt="logo" className="logo-img" />
         <h1 className="logo-text">List It!</h1>
      </header>
      <h1 className="title">Sign In</h1>
      <form onSubmit={handleLoginSubmit} className="form">
        <input type="text" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange}/>
        <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange}/>
        <button type="submit">Submit</button>
      </form>
      <h2 className="sign-up">Don't have an account?</h2>
      <h1 className="title">Sign Up</h1>
      <form className="form sign-up-form" onSubmit={handleSignUpSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={signupData.firstName} onChange={handleSignUpChange} />
        <input type="text" name="lastName" placeholder="Last Name" value={signupData.lastName} onChange={handleSignUpChange} />
        <input type="text" name="email" placeholder="Email" value={signupData.email} onChange={handleSignUpChange} />
        <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={handleSignUpChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}