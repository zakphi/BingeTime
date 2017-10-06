import React from 'react'

const Register = props => {
  return(
    <section id='register'>
      <form onSubmit={props.handleRegisterSubmit}>
        <input
          type='text'
          name='registerFirstName'
          value={props.registerFirstName}
          onChange={props.handleInputChange}
          placeholder='First Name'
        />
        <input
          type='text'
          name='registerLastName'
          value={props.registerLastName}
          onChange={props.handleInputChange}
          placeholder='Last Name'
        />
        <input
          type='text'
          name='registerEmail'
          value={props.registerEmail}
          onChange={props.handleInputChange}
          placeholder='Email'
        />
        <input
          type='text'
          name='registerUsername'
          value={props.registerUsername}
          onChange={props.handleInputChange}
          placeholder='Username'
        />
        <input
          type='password'
          name='registerPassword'
          value={props.registerPassword}
          onChange={props.handleInputChange}
          placeholder='Password'
        />
        <input type='submit' value='register' />
      </form>
    </section>
  )
}

export default Register