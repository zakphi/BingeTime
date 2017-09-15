import React from 'react'
import { Link } from 'react-router-dom'

const Result = props => {
  return(
    <div>
      <Link
        to={`/tv_shows/${props.result.id}`}
        onClick={ () => {props.handleSingleShowSearch(props.result.id)} }>
          {props.result.original_name}
        </Link>
    </div>
  )
}

export default Result
