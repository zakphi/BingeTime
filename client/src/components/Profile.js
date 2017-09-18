import React, { Component } from 'react'

class  Profile extends Component{
  render(){
    return(
      <div className='profile'>
        <h1>{props.userProfile.first_name}'s Profile</h1>
      </div>
    )
  }
}

export default Profile