import React, { Component } from 'react'
import axios from 'axios'
import Auth from '../modules/Auth'
import SingleUserShow from './SingleUserShow'

class  Profile extends Component{
  constructor(){
    super()

    this.state = {
      userProfile: '',
      userProfileLoaded: false,
      usersTvShows: '',
      usersTvShowsLoaded: false
    }
  }

  componentDidMount(){
    axios.get('/profile', {
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken()
      }
    })
      .then(res => {
        this.setState({
          userProfile: res.data.user,
          userProfileLoaded: true
        })
      })
      .catch(err => {
        console.log(err)
      })
    axios.get('/tv_shows', {
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken()
      }
    })
      .then(res => {
        console.log(res.data.tv_shows)
        this.setState({
          usersTvShows: res.data.tv_shows,
          usersTvShowsLoaded: true
        })
      })
  }

  renderUsersTvShows(){
    if(this.state.usersTvShowsLoaded){
      return this.state.usersTvShows.map(show => {
        return <SingleUserShow
                  key={show.id}
                  show={show}
                  configResults={this.props.configResults}
                />
      })
    }
  }

  render(){
    return(
      <section className='profile'>
        <h1>{this.state.userProfileLoaded ? `${this.state.userProfile.first_name}'s Profile` : ''}</h1>
        <h2>user's tv shows</h2>
        {this.renderUsersTvShows()}
      </section>
    )
  }
}

export default Profile