import React from 'react'

const Home = props => {
  return(
    <div>
      <h1>home</h1>
      <form>
        <input type='text' name='showSearch' placeholder='Search for Show' />
        <input type='submit' />
      </form>
    </div>
  )
}

export default Home