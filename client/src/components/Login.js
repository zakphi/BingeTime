import React, { Component } from 'react'
import axios from 'axios'
import Auth from '../modules/Auth'
import { Redirect } from 'react-router-dom'

class Login extends Component{
  constructor(){
    super()

    this.state = {
      fireRedirect: false,
      loginUsername: '',
      loginPassword: ''
    }
  }

  handleInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  handleLoginSubmit = (e) => {
    e.preventDefault()
    axios.post('/login', {
      username: this.state.loginUsername,
      password: this.state.loginPassword
    })
      .then(res => {
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

  render(){
    return(
      <section id='login'>
        <h2>login</h2>
        <form onSubmit={this.handleLoginSubmit}>
          <input
            type='text'
            name='loginUsername'
            value={this.state.loginUsername}
            placeholder='Username'
            onChange={this.handleInputChange}
          />
          <input
            type='password'
            name='loginPassword'
            value={this.state.loginPassword}
            placeholder='Password'
            onChange={this.handleInputChange}
          />
          <input type='submit' value='login' />
        </form>
        {this.state.fireRedirect ? <Redirect push to={'/profile'} /> : '' }
      </section>
    )
  }
}

export default Login