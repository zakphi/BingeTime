import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import axios from 'axios'

import Auth from './modules/Auth'
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Home from './components/Home'
import SingleShow from './components/SingleShow'
import Footer from './components/Footer'

class App extends Component {
  constructor(){
    super()

    this.state = {
      auth: Auth.isUserAuthenticated(),
      showName: '',
      showResults: null,
      searchResultsLoaded: false,
      showID: '',
      singleShowData: '',
      configResults: ''
    }
  }

  componentDidMount(){
    axios.get('/config')
      .then(res => {
        this.setState({
          configResults: res.data.images
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
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
          auth: Auth.isUserAuthenticated()
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
          showResults: res.data.results,
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
  }

  handleDeleteShow = (showID) => {
    axios.delete(`/tv_shows/${showID}`, {
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken()
      }
    })
  }

  render() {
    return (
      <Router>
        <div id="App">
          <Header logoutUser={this.logoutUser} />
          <main>
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
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route
              exact
              path='/profile'
              render={() =>
                <Profile
                  configResults={this.state.configResults}
                  handleSingleShowSearch={this.handleSingleShowSearch}
                />
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
                  handleDeleteShow={this.handleDeleteShow}
                />
              }
            />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
