import React from 'react'
import '../styles/Event.css'
import { Link } from 'react-router-dom'

const Allevent = (prop) => {
  return (
    <div className='event'>
        <h3>{prop.title}</h3>
        <p>Game : {prop.game}</p>
        <p>{prop.description}</p>
        <p>Date : {prop.date}</p>
        <p>Time : {prop.starttime} to {prop.endtime}</p>
        <div>
            <Link to={`/event/request/${prop._id}`}><p>View details</p></Link>
        </div>
    </div>
  )
}

export default Allevent