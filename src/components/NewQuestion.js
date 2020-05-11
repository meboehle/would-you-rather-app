import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }

  handleOptionOneChange = (e) => {
    const optionOneText = e.target.value

    this.setState(() => ({
      optionOneText
    }))
  }

  handleOptionTwoChange = (e) => {
    const optionTwoText = e.target.value

    this.setState(() => ({
      optionTwoText
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch, id } = this.props

    console.log(id)

    dispatch(handleAddQuestion(optionOneText, optionTwoText))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: id ? false : true
    }))
  }

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div className='new-question-container'>
        <h2>Create New Question</h2>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <h4 className='wyr-or'>Would You Rather...</h4>
          <textarea
            placeholder='option one'
            value={optionOneText}
            onChange={this.handleOptionOneChange}
            className='textarea'
          />
          <h4 className='wyr-or'>or</h4>
          <textarea
            placeholder='option two'
            value={optionTwoText}
            onChange={this.handleOptionTwoChange}
            className='textarea'
          />
          <button
            className='submit-btn'
            type='submit'
            disabled={optionOneText === '' || optionTwoText === ''}>
              <span className='btn-text'>Submit</span>
            </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)