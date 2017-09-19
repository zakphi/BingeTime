import React from 'react'

const ProfileItem = props => {
  let base_url = props.configResults.secure_base_url
  let image_size = 'w185'
  let poster_path = props.show.poster_path
  let poster_image = `${base_url}${image_size}${poster_path}`

  return(
    <article>
      <img
        src={poster_image}
        alt={props.show.original_name}
      />
    </article>
  )
}

export default ProfileItem