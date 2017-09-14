import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import axios from 'axios'

import Auth from './modules/Auth'
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'

class App extends Component {
  constructor(){
    super()

    this.state = {
      auth: Auth.isUserAuthenticated(),
      fireRedirect: false,
      loginUsername: '',
      loginPassword: '',
      registerFirstName: '',
      registerLastName: '',
      registerEmail: '',
      registerUsername: '',
      registerPassword: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }

  handleInputChange(e){
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  handleLoginSubmit(e){
    e.preventDefault()
    axios.post('/login', {
      username: this.state.loginUsername,
      password: this.state.loginPassword
    })
      .then(res => {
        console.log(res)
        if(res.data.token){
          Auth.authenticateToken(res.data.token)
          this.setState({
            auth: Auth.isUserAuthenticated(),
            loginUsername: '',
            loginPassword: '',
            fireRedirect: true
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
    }

    handleRegisterSubmit(e){
      e.preventDefault()
      axios.post('/users', {
        user: {
          first_name: this.state.registerFirstName,
          last_name: this.state.registerLastName,
          email: this.state.registerEmail,
          username: this.state.registerUsername,
          password: this.state.registerPassword
        }
      })
      .then(res => {
        if(res.data.token){
          Auth.authenticateToken(res.data.token)
          this.setState({
            auth: Auth.isUserAuthenticated(),
            fireRedirect: true
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  logoutUser(){
    axios.delete('/logout', {
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken()
      }
    })
      .then(res => {
        Auth.deauthenticateUser()
        this.setState({
          auth: Auth.isUserAuthenticated(),
          loginUsername: '',
          loginPassword: '',
          fireRedirect: false
        })
      })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header logoutUser={this.logoutUser} />
          <Route
            exact
            path='/login'
            render={() =>
              <Login
                loginUsername={this.state.loginUsername}
                loginPassword={this.state.loginPassword}
                handleInputChange={this.handleInputChange}
                handleLoginSubmit={this.handleLoginSubmit}
              />
            }
          />
          <Route
            exact
            path='/register'
            render={() =>
              <Register
                registerFirstName={this.state.registerFirstName}
                registerLastName={this.state.registerLastName}
                registerEmail={this.state.registerEmail}
                registerUsername={this.state.registerUsername}
                registerPassword={this.state.registerPassword}
                handleInputChange={this.handleInputChange}
                handleRegisterSubmit={this.handleRegisterSubmit}
              />
            }
          />
          <Route
            exact
            path='/profile'
            render={() =>
              <Profile />
            }
          />
          {this.state.fireRedirect ? <Redirect push to={'/'} /> : '' }
        </div>
      </Router>
    );
  }
}

export default App;
