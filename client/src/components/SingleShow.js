import React from 'react'

const SingleShow = props => {

  let totalMinutes = props.singleShowData.number_of_episodes * props.singleShowData.episode_run_time[0]
  let days = Math.floor(totalMinutes / 1440);
  let hours = Math.floor((totalMinutes - days * 1440) / 60);
  let minutes = Math.floor(totalMinutes - (days * 1440) - (hours * 60))
  let formattedBingeTime = `${days} days, ${hours} hours, and ${minutes} minutes`

  return(
    <div>
      <h1>{props.singleShowData.original_name}</h1>
      <p>{props.singleShowData.overview}</p>
      <p>{props.singleShowData.original_name} has {props.singleShowData.number_of_seasons} seasons consisting of {props.singleShowData.number_of_episodes} episodes.</p>
      <p>It will approximately take you {formattedBingeTime} to watch all of {props.singleShowData.original_name}</p>
    </div>
  )
}

export default SingleShow
