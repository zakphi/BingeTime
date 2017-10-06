import React from 'react'

const Login = props => {
  return(
    <section id='login'>
      <h2>login</h2>
      <form onSubmit={props.handleLoginSubmit}>
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
    </section>
  )
}

export default Login