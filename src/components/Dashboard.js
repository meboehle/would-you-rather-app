import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
  render() {
    const { unansweredIds, answeredIds } = this.props
    return (
      <div className='questions'>
        <ul className='unanswered'>
          <h2>Unanswered Questions</h2>
          {unansweredIds && unansweredIds.map((qid) => (
            <li key={qid}>
              <Question qid={qid} answered={false}/>
            </li>
          ))}
        </ul>
        <ul className='answered'>
          <h2>Answered Questions</h2>
          {answeredIds && answeredIds.map((qid) => (
            <li key={qid}>
              <Question qid={qid} answered={true}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions }) {
  let unanswered = [];
  let answered = [];

  Object.values(questions).forEach((question) => {
    if (question.optionOne.votes.find(vote => vote === authedUser)
      || question.optionTwo.votes.find(vote => vote === authedUser)) {
      return answered.push(question)
    } else {
      unanswered.push(question)
    }
  })

  return {
    unansweredIds: unanswered
                    .sort((a,b) => b.timestamp - a.timestamp)
                    .map(question => question.id),
    answeredIds: answered
                  .sort((a,b) => b.timestamp - a.timestamp)
                  .map(question => question.id),
  }
}

export default connect(mapStateToProps)(Dashboard)