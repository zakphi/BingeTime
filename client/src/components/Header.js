import React from 'react'
import Nav from './Nav'

const Header = props => {
  return(
    <header>
      <h1>BingeTime!</h1>
      <Nav logoutUser={props.logoutUser} />
    </header>
  )
}

export default Header