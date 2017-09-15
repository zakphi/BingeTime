import React, { Component } from 'react'
import Result from './Result'

class SearchResults extends Component{
  renderSearchResults(){
    if(this.props.searchResultsLoaded){
      return this.props.showResults.map(result => {
        return <Result key={result.id} result={result}/>
      })
    }
  }

  render(){
    return(
      <div>
        <h1>search results</h1>
        <div>
          {this.renderSearchResults()}
        </div>
      </div>
      )
  }
}

export default SearchResults
