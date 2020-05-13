import React, { Component } from 'react'
import { connect } from 'react-redux'
class Leaderboard extends Component {
  render() {
    return (
      <div>
        <h2>Leaderboard</h2>
        <div className='leaderboard-container'>
          {Object.values(this.props.sortedUsers).map((user, i) => {
            console.log(user)
            return (
              <div key={user.id}
                className='leaderboard'
                style={{boxShadow: i === this.props.sortedUsers.length -1 ?
                  'none' : 'inset 0 -4px 4px -4px #23c4b6'}}>
                <div className='leaderboard-user'>
                  Total for
                  <img
                    src={user.avatarURL}
                    alt={`Avatar of ${user.name}`}
                    className='avatar-question'
                  />
                  {user.name} is
                  <div className='select total'>{user.total}</div> questions
                </div>
                <div className='leaderboard-stats'>
                  <div className='stats'>
                    Number of questions asked <span className='number'>{user.questions.length}</span>
                  </div>
                  <div className='stats'>
                    Number of questions answered <span className='number'>{Object.keys(user.answers).length}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  const sortedUsers = Object.values(users).map(user => {
    return {
      ...user,
      total: Object.keys(user.answers).length + user.questions.length
    }
  }).sort((a,b) => b.total - a.total)

  return {
    sortedUsers
  }
}

export default connect(mapStateToProps)(Leaderboard)