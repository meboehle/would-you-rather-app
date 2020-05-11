import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
  render() {
    const { users, question } = this.props

    if (question === null) {
      return <p>This question doesn't exist</p>
    }

    const {
      id, author, optionOne, optionTwo, timestamp
    } = question

    const { avatarURL, name } = Object.values(users).find((user) => user.id === author)
    const date = formatDate(timestamp)

    return (
      <Link to={`/question/${id}`} className='question'>
        <div className='question-author'>
            <img
              src={avatarURL}
              alt={`Avatar of ${name}`}
              className='avatar-question'/>{name}
        </div>
        <div className='question-container'>
          <span>{date}</span>
          <div className='wyr-or'>Would you rather...</div>
          <span>{optionOne.text}</span>
          <div className='wyr-or'> or </div>
          <span>{optionTwo.text}</span>
        </div>
      </Link>
    )
  }
}

function mapStateToProps({ loggedInUser, questions, users }, { qid }) {
  const question = questions[qid]
  return {
    loggedInUser,
    question: question,
    users,
  }
}

export default withRouter(connect(mapStateToProps)(Question))