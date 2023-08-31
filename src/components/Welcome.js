import React from 'react'
import { connect } from 'react-redux'
import images from '../utils/images'

const Welcome = ({user}) => {
  return (
    <div className='welcome'>
      <img
        src={images[user.index]}
        alt={`Avatar of ${user.name}`}
        className='avatar-welcome'/>
      Welcome, {user.name}!
    </div>
  )
}

function mapStateToProps ({authedUser, users}) {
  const user = Object.values(users).find(user => user.id === authedUser)
  return {
    user
  }
}

export default connect(mapStateToProps)(Welcome)