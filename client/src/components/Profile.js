import React, { Component } from 'react'
import axios from 'axios'
import Auth from '../modules/Auth'

class  Profile extends Component{
  constructor(){
    super()

    this.state = {
      userProfile: '',
      userProfileLoaded: false
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
  }

  render(){
    return(
      <div className='profile'>
        <h1>{this.state.userProfileLoaded ? `${this.state.userProfile.first_name}'s Profile` : ''}</h1>
      </div>
    )
  }
}

export default Profile