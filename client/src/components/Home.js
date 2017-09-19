import React from 'react'
import SearchResults from './SearchResults'

const Home = props => {
  return(
    <main className='home'>
      <h2>home</h2>
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
        ? <SearchResults
            showResults={props.showResults}
            searchResultsLoaded={props.searchResultsLoaded}
            handleSingleShowSearch={props.handleSingleShowSearch}
            showID={props.showID}
            configResults={props.configResults}
          />
        : ''}
    </main>
  )
}

export default Home
