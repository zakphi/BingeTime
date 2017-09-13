import React from 'react'

import { Link } from 'react-router-dom'
import Auth from '../modules/Auth'

const Nav = props => {
  return(
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {!Auth.isUserAuthenticated()
          ? <li>
              <Link to='/login'>Login</Link>
            </li>
          : ''}
        {!Auth.isUserAuthenticated()
          ? <li>
              <Link to='/register'>Regiser</Link>
            </li>
          : ''}
        {Auth.isUserAuthenticated()
          ? <li>
              <Link to='/profile'>Profile</Link>
            </li>
          : ''}
        {Auth.isUserAuthenticated()
          ? <li>
              <Link to='/' onClick={props.logoutUser}>Logout</Link>
            </li>
          : ''}
      </ul>
    </nav>
  )
}

export default Nav