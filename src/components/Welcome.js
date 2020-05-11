import React, { Component } from 'react'
import { connect } from 'react-redux'

class Welcome extends Component {

  render() {
    const { loggedInUser, users } = this.props
    const user = Object.values(users).find(user => user.id === loggedInUser)

    return (
      <div className='welcome'>
        <img
          src={user.avatarURL}
          alt={`Avatar of ${user.name}`}
          className='avatar-welcome'/>
        Welcome, {user.name}!
      </div>
    )
  }
}

function mapStateToProps ({loggedInUser, users}) {
  return {
    loggedInUser,
    users
  }
}

export default connect(mapStateToProps)(Welcome)