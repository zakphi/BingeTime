import React, { Component } from 'react'
import SearchResult from './SearchResult'

class SearchResults extends Component{
  renderSearchResults(){
    if(this.props.searchResultsLoaded){
      return this.props.showResults.map(result => {
        return <SearchResult
                  key={result.id}
                  result={result}
                  handleSingleShowSearch={this.props.handleSingleShowSearch}
                  showID={this.props.showID}
                  configResults={this.props.configResults}
                />
      })
    }
  }

  render(){
    return(
      <section className='searchResults'>
        <h1>search results</h1>
        {this.renderSearchResults()}
      </section>
      )
  }
}

export default SearchResults
