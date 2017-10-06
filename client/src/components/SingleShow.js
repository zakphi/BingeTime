import React from 'react'

const SingleShow = props => {

  let totalMinutes = props.singleShowData.number_of_episodes * props.singleShowData.episode_run_time[0] || 0
  let days = Math.floor(totalMinutes / 1440);
  let hours = Math.floor((totalMinutes - days * 1440) / 60);
  let minutes = Math.floor(totalMinutes - (days * 1440) - (hours * 60))
  let formattedBingeTime = `${days} days, ${hours} hours, and ${minutes} minutes`

  let base_url = props.configResults.secure_base_url
  let image_size = 'w1280'
  let poster_path = props.singleShowData.backdrop_path
  let poster_image = `${base_url}${image_size}${poster_path}`

  const divStyle = {
    backgroundImage: `url(${poster_image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  return(
    <section id='singleShow' style={poster_path == null ? null : divStyle}>
      <article id='overlay'></article>
      <article id='showInfo'>
        <h2>{props.singleShowData.original_name}</h2>
        <p>{props.singleShowData.overview}</p>
        <p>{props.singleShowData.original_name} has {props.singleShowData.number_of_seasons} seasons consisting of {props.singleShowData.number_of_episodes} episodes.</p>
        <p>It will approximately take you {formattedBingeTime} to watch all of {props.singleShowData.original_name}</p>
      </article>
      {props.auth
        ? <article id='showManageBtns'>
            <button onClick={props.handleSaveShow}>save show</button>
            <button onClick={() => props.handleDeleteShow(props.singleShowData.id)}>delete show</button>
          </article>
        : ''}
    </section>
  )
}

export default SingleShow
