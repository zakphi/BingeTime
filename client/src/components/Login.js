import React from 'react'

const Login = props => {
  return(
    <form className='loginForm' onSubmit={props.handleLoginSubmit}>
      <input
        type='text'
        name='loginUsername'
        value={props.loginUsername}
        placeholder='Username'
        onChange={props.handleInputChange}
      />
      <input
        type='password'
        name='loginPassword'
        value={props.loginPassword}
        placeholder='Password'
        onChange={props.handleInputChange}
      />
      <input type='submit' value='login' />
    </form>
  )
}

export default Login