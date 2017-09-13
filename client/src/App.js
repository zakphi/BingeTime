import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import axios from 'axios'

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
  }

  handleInputChange(e){
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
