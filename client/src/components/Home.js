import React from 'react'
import SearchResults from './SearchResults'

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
      {props.searchResultsLoaded
        ? <SearchResults showResults={props.showResults} searchResultsLoaded={props.searchResultsLoaded} />
        : ''}
    </div>
  )
}

export default Home
