import React from 'react'
import { Link } from 'react-router-dom'
import image from '../imgComingSoon.png'

const SearchResult = props => {
  let base_url = props.configResults.secure_base_url
  let image_size = 'w185'
  let poster_path = props.result.poster_path
  let poster_image = poster_path == null ? image : `${base_url}${image_size}${poster_path}`

  return(
    <article className='searchResult'>
      <Link
        to={`/tv_shows/${props.result.id}`}
        onClick={ () => {props.handleSingleShowSearch(props.result.id)} }>
          <img
              src={poster_image}
              alt={props.result.original_name}
          />
        </Link>
    </article>
  )
}

export default SearchResult
