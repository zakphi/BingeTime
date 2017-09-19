import React from 'react'
import { Link } from 'react-router-dom'

const ProfileItem = props => {
  let base_url = props.configResults.secure_base_url
  let image_size = 'w185'
  let poster_path = props.show.poster_path
  let poster_image = `${base_url}${image_size}${poster_path}`

  return(
    <article>
      <Link
        to={`/tv_shows/${props.show.external_id}`}
        onClick={ () => {props.handleSingleShowSearch(props.show.external_id)} }
      >
        <img
          src={poster_image}
          alt={props.show.title}
        />
      </Link>
    </article>
  )
}

export default ProfileItem