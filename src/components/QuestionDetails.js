import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import NotFound from './404'
import VoteForm from './VoteForm'
import VoteResults from './VoteResults'

class QuestionDetails extends Component {
  render() {
    const { qid, answered, questionExists } = this.props

    if (!questionExists) {
      return <NotFound/>
    }

    return (
      <div>
        <div className='single-question'>
          <Question qid={qid} />
        </div>
        {answered && <VoteResults qid={qid}/>}
        {!answered && <VoteForm qid={qid}/>}
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions }, props) {
  const { id } = props.match.params
  const question = questions[id]
  const questionExists = question === undefined ? false : true

  let answered = false
  if (question && question.optionOne.votes.find(vote => vote === authedUser)) {
    answered = true
  } else if (question && question.optionTwo.votes.find(vote => vote === authedUser)) {
    answered = true
  }
  return {
    qid: id,
    answered,
    questionExists
  }
}

export default connect(mapStateToProps)(QuestionDetails)