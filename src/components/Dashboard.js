import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
  state = {
    toggle: 'unanswered'
  }

  onChange = (e) => {
    const toggle = e.target.value

    this.setState(() => ({
      toggle
    }))
  }

  onClick = (toggle) => {
    this.setState(() => ({
      toggle
    }))
  }

  render() {
    const { unansweredIds, answeredIds } = this.props
    return (
      <div className='questions'>
        <h2>Questions</h2>
        <div className='toggle-btns'>
          <label>
            <input
              className='option'
              type='radio'
              name='option'
              value='unanswered'
              defaultChecked
              onChange={(e) => this.onChange(e)}/>
            <div className='select'>U</div>
            <span>Unanswered</span>
          </label>
          <label>
            <input
              className='option'
              type='radio'
              name='option'
              value='answered'
              onChange={(e) => this.onChange(e)}/>
            <div className='select'>A</div>
            <span>Answered</span>
          </label>
        </div>
        {this.state.toggle === 'unanswered' && unansweredIds.length !== 0 &&
          <ul className='question-list'>
            {unansweredIds && unansweredIds.map((qid) => (
              <li key={qid}>
                <Question qid={qid} answered={false}/>
              </li>
            ))}
          </ul>}
        {this.state.toggle === 'unanswered' && unansweredIds.length === 0 &&
          <div>No more questions to answer</div>
        }
        {this.state.toggle === 'answered' && answeredIds.length !== 0 &&
          <ul className='question-list'>
            {answeredIds && answeredIds.map((qid) => (
              <li key={qid}>
                <Question qid={qid} answered={true}/>
              </li>
            ))}
          </ul>}
        {this.state.toggle === 'answered' && answeredIds.length === 0 &&
          <div>You have not answered any questions yet</div>
        }
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