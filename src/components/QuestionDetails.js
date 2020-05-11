import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Question from './Question'
import { handleAnswerQuestion } from '../actions/questions'

class QuestionDetails extends Component {
  state = {
    voted: false,
    answer: '',
    toHome: false,
  }

  onVote = (e) => {
    const answer = e.target.value

    this.setState({
      voted: true,
      answer
    })
  }

  handleSubmit = () => {
    const { answer } = this.state
    const { dispatch, qid } = this.props

    dispatch(handleAnswerQuestion(qid, answer))

    this.setState(() => ({
      voted: false,
      answer: '',
      toHome: qid ? false : true
    }))
  }

  render() {
    const { voted, toHome } = this.state
    const { question, qid, answered, answer, user } = this.props

    const { optionOne, optionTwo } = question
    const totalVotes = optionOne.votes.length + optionTwo.votes.length
    const optionOnePercentage = optionOne.votes.length / totalVotes * 100
    const optionTwoPercentage = optionTwo.votes.length / totalVotes * 100

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <div className='single-question'>
          <Question qid={qid} />
        </div>
        {answered &&
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
                  src={user.avatarURL}
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
                  src={user.avatarURL}
                  alt={`Avatar of ${user.name}`}
                  className='avatar-question'/>}
              <span className='label-text'>{optionTwo.text} </span>
              <span className='two votes'>
                {optionTwo.votes.length} of {totalVotes} ({Number(optionTwoPercentage.toFixed(2))}%)
              </span>
            </div>
          </div>
        </div>
        }
        {!answered &&
          <form>
            <div className='voting-form'>
              <label>
                <input
                  className='option'
                  type='radio'
                  name='option'
                  value='optionOne'
                  onChange={(e) => this.onVote(e)}/>
                <div className='select'>1</div>
                {optionOne.text}
              </label>
              <label>
                <input
                  className='option'
                  type='radio'
                  name='option'
                  value='optionTwo'
                  onChange={(e) => this.onVote(e)}/>
                <div className='select'>2</div>
                {optionTwo.text}
              </label>
            </div>
            <button
              className='submit-btn vote'
              type='submit'
              disabled={!voted}
              onClick={() => this.handleSubmit()}>
              <span className='btn-text'>Submit</span>
            </button>
          </form>
        }
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  const question = questions[id]

  const user = Object.values(users).find(user => user.id === authedUser)

  let answered = false
  let answer = ''
  if (question.optionOne.votes.find(vote => vote === authedUser)) {
    answered = true
    answer = question.optionOne
  } else if (question.optionTwo.votes.find(vote => vote === authedUser)) {
    answered = true
    answer = question.optionTwo
  }
  return {
    question,
    qid: id,
    answered,
    answer,
    user
  }
}

export default connect(mapStateToProps)(QuestionDetails)