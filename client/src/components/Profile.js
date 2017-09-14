import React, { Component } from 'react'
import axios from 'axios'
import Auth from '../modules/Auth'

class Profile extends Component{
  constructor(){
    super()
    
    this.state = {
      profileData: null,
      profileDataLoaded: false
    }
  }

  componentDidMount(){
    axios('/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken()
      }
    })
      .then(res => {
        console.log(res.data.user)
      })
  }

  render(){
    return(
      <h1>Profile</h1>
    )
  }
}

export default Profile