import React from 'react'
import { connect } from 'react-redux'
import images from '../images'

const VoteResults = ({question, user, answer}) => {
  const { optionOne, optionTwo } = question
  const totalVotes = optionOne.votes.length + optionTwo.votes.length
  const optionOnePercentage = optionOne.votes.length / totalVotes * 100
  const optionTwoPercentage = optionTwo.votes.length / totalVotes * 100

  return (
    <div className='vote-details'>
      <div className='total-label'>
        <span className='label-text'>total votes </span>
        <span className='votes'>{totalVotes}</span>
      </div>
      <div className='results'>
        <div className='bar-fill option-one'
          style={{
            width: optionOnePercentage + '%',
            borderRadius: optionTwoPercentage === 0 ? '35px' : '35px 0 0 35px'}}>
        </div>
        <div className='bar-fill option-two'
        style={{
          width: optionTwoPercentage + '%',
          borderRadius: optionOnePercentage === 0 ? '35px' : '0 35px 35px 0'}}>
        </div>
      </div>
      <div className='bar-labels'>
        <div className='label'>
          {answer.text === optionOne.text &&
            <img
              src={images[user.index]}
              alt={`Avatar of ${user.name}`}
              className='avatar-question'/>}
          <span className='label-text'>{optionOne.text} </span>
          <span className='one votes'>
            {optionOne.votes.length} of {totalVotes} ({Number(optionOnePercentage.toFixed(2))}%)
          </span>
        </div>
        <div className='label'>
          {answer.text === optionTwo.text &&
            <img
              src={images[user.index]}
              alt={`Avatar of ${user.name}`}
              className='avatar-question'/>}
          <span className='label-text'>{optionTwo.text} </span>
          <span className='two votes'>
            {optionTwo.votes.length} of {totalVotes} ({Number(optionTwoPercentage.toFixed(2))}%)
          </span>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps({ authedUser, questions, users }, {qid}) {
  const question = questions[qid]
  const user = Object.values(users).find(user => user.id === authedUser)

  let answer = ''
  if (question && question.optionOne.votes.find(vote => vote === authedUser)) {
    answer = question.optionOne
  } else if (question && question.optionTwo.votes.find(vote => vote === authedUser)) {
    answer = question.optionTwo
  }

  return {
    question,
    user,
    answer
  }
}

export default connect(mapStateToProps)(VoteResults)