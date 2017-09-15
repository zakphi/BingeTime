import React from 'react'

const Home = props => {
  return(
    <div>
      <h1>home</h1>
      <form onSubmit={props.handleShowSearch}>
        <input
          type='text'
          name='showName'
          placeholder='Search for Show'
          value={props.showName}
          onChange={props.handleInputChange}
        />
        <input type='submit' />
      </form>
    </div>
  )
}

export default Home