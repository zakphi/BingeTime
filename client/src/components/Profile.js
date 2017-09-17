import React from 'react'

const  Profile = (props) => {

  return(
    <div className='profile'>
      <h1>{props.userProfile.first_name}'s Profile</h1>
    </div>
  )
}

export default Profile