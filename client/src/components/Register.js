import React, { Component } from 'react'
import axios from 'axios'
import Auth from '../modules/Auth'
import { Redirect } from 'react-router-dom'

class Register extends Component {
  constructor(){
    super()

    this.state = {
      fireRedirect: false,
      registerFirstName: '',
      registerLastName: '',
      registerEmail: '',
      registerUsername: '',
      registerPassword: ''
    }
  }

  handleInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  handleRegisterSubmit = (e) => {
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

  render(){
    return(
      <section id='register'>
        <h2>register</h2>
        <form onSubmit={this.handleRegisterSubmit}>
          <input
            type='text'
            name='registerFirstName'
            value={this.state.registerFirstName}
            onChange={this.handleInputChange}
            placeholder='First Name'
          />
          <input
            type='text'
            name='registerLastName'
            value={this.state.registerLastName}
            onChange={this.handleInputChange}
            placeholder='Last Name'
          />
          <input
            type='text'
            name='registerEmail'
            value={this.state.registerEmail}
            onChange={this.handleInputChange}
            placeholder='Email'
          />
          <input
            type='text'
            name='registerUsername'
            value={this.state.registerUsername}
            onChange={this.handleInputChange}
            placeholder='Username'
          />
          <input
            type='password'
            name='registerPassword'
            value={this.state.registerPassword}
            onChange={this.handleInputChange}
            placeholder='Password'
          />
          <input type='submit' value='register' />
        </form>
        {this.state.fireRedirect ? <Redirect push to={'/'} /> : '' }
      </section>
    )
  }
}

export default Register