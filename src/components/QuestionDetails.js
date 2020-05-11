import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class QuestionDetails extends Component {
  state = {
    voted: false,
    vote: ''
  }

  onVote = (e) => {
    const vote = e.target.value

    this.setState({
      voted: true,
      vote
    })
  }

  render() {
    const { question, qid, answered } = this.props
    const { optionOne, optionTwo } = question
    const totalVotes = optionOne.votes.length + optionTwo.votes.length
    const optionOnePercentage = optionOne.votes.length / totalVotes * 100
    const optionTwoPercentage = optionTwo.votes.length / totalVotes * 100

    return (
      <div>
        <div className='single-question'>
          <Question qid={qid} answered={answered}/>
        </div>
        {answered &&
        <div className='vote-details'>
          <div className='label'>
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
              <span className='label-text'>{optionOne.text} </span>
              <span className='one votes'>{optionOne.votes.length}</span>
            </div>
            <div className='label'>
              <span className='label-text'>{optionTwo.text} </span>
              <span className='two votes'>{optionTwo.votes.length}</span>
            </div>
          </div>
        </div>
        }
        {!answered &&
          <form>
            <div className='voting-form'>
              <label className='vote-select'>
                <input
                  className='option'
                  type='radio'
                  name='option'
                  value={optionOne.text}
                  onChange={(e) => this.onVote(e)}/>
                <div className='select'>1</div>
                {optionOne.text}
              </label>
              <label className='vote-select'>
                <input
                  className='option'
                  type='radio'
                  name='option'
                  value={optionTwo.text}
                  onChange={(e) => this.onVote(e)}/>
                <div className='select'>2</div>
                {optionTwo.text}
              </label>
            </div>
            <button
              className='submit-btn vote'
              type='submit'
              disabled={!this.state.voted}>
              <span className='btn-text'>Submit</span>
            </button>
          </form>
        }
      </div>
    )
  }
}

function mapStateToProps({ loggedInUser, questions, users }, props) {
  const { id } = props.match.params
  const question = questions[id]
  let answered = false;
  if (question.optionOne.votes.find(vote => vote === loggedInUser)
    || question.optionTwo.votes.find(vote => vote === loggedInUser)) {
    answered = true;
  }
  return {
    question,
    qid: id,
    answered
  }
}

export default connect(mapStateToProps)(QuestionDetails)