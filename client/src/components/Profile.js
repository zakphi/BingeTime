import React, { Component } from 'react'
import axios from 'axios'
import Auth from '../modules/Auth'
import ProfileItem from './ProfileItem'

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
        console.log(res.data)
        this.setState({
          usersTvShows: res.data,
          usersTvShowsLoaded: true
        })
      })
  }

  renderUsersTvShows(){
    if(this.state.usersTvShowsLoaded){
      return this.state.usersTvShows.map(show => {
        return <ProfileItem
                  key={show.id}
                  show={show}
                  configResults={this.props.configResults}
                  handleSingleShowSearch={this.props.handleSingleShowSearch}
                />
      })
    }
  }

  render(){
    return(
      <section className='profile'>
        <h1>{this.state.userProfileLoaded ? `${this.state.userProfile.first_name}'s Profile` : ''}</h1>
        {this.renderUsersTvShows()}
      </section>
    )
  }
}

export default Profile