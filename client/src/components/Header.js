import React from 'react'
import Nav from './Nav'

const Header = props => {
  return(
    <Nav logoutUser={props.logoutUser} />
  )
}

export default Header