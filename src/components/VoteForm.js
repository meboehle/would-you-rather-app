import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'

class VoteForm extends Component {
  state = {
    voted: false,
    answer: '',
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
    }))
  }

  render() {
    const { voted } = this.state
    const { optionOne, optionTwo } = this.props.question
    return (
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
          onClick={this.handleSubmit}>
          <span className='btn-text'>Submit</span>
        </button>
      </form>
    )
  }
}

function mapStateToProps({ questions }, {qid}) {
  const question = questions[qid]

  return {
    question
  }
}

export default connect(mapStateToProps)(VoteForm)