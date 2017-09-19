import React from 'react'
import logo from '../tmdb-logo.png'

const Footer = () => {
  return(
    <footer>
      <img src={logo} alt='tmdb logo' />
      <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
    </footer>
  )
}

export default Footer