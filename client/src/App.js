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
import Home from './components/Home'
import SingleShow from './components/SingleShow'

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
      registerPassword: '',
      showName: '',
      showResults: null,
      searchResultsLoaded: false,
      showID: '',
      singleShowData: '',
      configResults: null,
      userProfile: null
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
        axios.get('/profile', {
          headers: {
            'Authorization': `Token ${Auth.getToken()}`,
            token: Auth.getToken()
          }
        })
          .then(res => {
            this.setState({
              userProfile: res.data.user
            })
          })
      })
      .catch(err => {
        console.log(err)
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

  logoutUser = () => {
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

  handleShowSearch = (e) => {
    e.preventDefault()
    axios('/search', {
      method: 'POST',
      data: {
        showName: this.state.showName
      }
    })
      .then(res => {
        this.setState({
          showResults: res.data.search_res.results,
          configResults: res.data.config_res.images,
          searchResultsLoaded: true
        })
      })
  }

  handleSingleShowSearch = (showID) => {
    axios(`/tv_shows/${showID}`, {
      method: 'GET',
      data: {
        showID: this.state.showID
      }
    })
      .then(res => {
        this.setState({
          singleShowData: res.data,
          showID
        })
      })
      .then(
        this.setState({
          searchResultsLoaded: false,
          showName: ''
        })
      )
  }

  handleSaveShow = () => {
    axios('/tv_shows', {
      method: 'POST',
      data: {
        tv_show: {
          external_id: this.state.singleShowData.id,
          title: this.state.singleShowData.original_name,
          summary: this.state.singleShowData.overview,
          poster_path: this.state.singleShowData.poster_path,
          run_time: this.state.singleShowData.episode_run_time[0]
        }
      },
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken()
      }
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header logoutUser={this.logoutUser} />
          <Route
            exact
            path='/'
            render={() =>
              <Home
                showName={this.state.showName}
                handleShowSearch={this.handleShowSearch}
                handleInputChange={this.handleInputChange}
                showResults={this.state.showResults}
                searchResultsLoaded={this.state.searchResultsLoaded}
                handleSingleShowSearch={this.handleSingleShowSearch}
                showID={this.state.showID}
                configResults={this.state.configResults}
              />
            }
          />
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
              <Profile userProfile={this.state.userProfile} />
            }
          />
          <Route
            exact
            path={`/tv_shows/${this.state.showID}`}
            render={() =>
              <SingleShow
                singleShowData={this.state.singleShowData}
                configResults={this.state.configResults}
                handleSaveShow={this.handleSaveShow}
                auth={this.state.auth}
              />
            }
          />
          {this.state.fireRedirect ? <Redirect push to={'/'} /> : '' }
        </div>
      </Router>
    );
  }
}

export default App;
