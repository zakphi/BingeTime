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

class App extends Component {
  constructor(){
    super()

    this.state = {
      auth: Auth.isUserAuthenticated(),
      fireRedirect: false,
      loginUsername: null,
      loginPassword: null,
      registerFirstName: null,
      registerLastName: null,
      registerEmail: null,
      registerUsername: null,
      registerPassword: null
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
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
            loginUsername: null,
            loginPassword: null
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
            auth: Auth.isUserAuthenticated()
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
        </div>
      </Router>
    );
  }
}

export default App;
