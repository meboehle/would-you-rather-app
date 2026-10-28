import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { trackEvent } from '../utils/pendo'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText
    })
      .then((question) => {
        dispatch(addQuestion(question))
        // Pendo: the new question was saved and added to the store
        trackEvent('question_created', {
          question_id: question.id,
          author: question.author,
          option_one_length: question.optionOne.text.length,
          option_two_length: question.optionTwo.text.length,
          timestamp: question.timestamp
        })
      })
      .then(() => dispatch(hideLoading()))
  }
}

function answerQuestion (qid, answer, authedUser) {
  return {
    type: ANSWER_QUESTION,
    qid,
    answer,
    authedUser
  }
}

export function handleAnswerQuestion (qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
      .then(() => {
        dispatch(answerQuestion(qid, answer, authedUser))
        // Pendo: the vote was saved and recorded in the store
        const q = getState().questions[qid]
        trackEvent('question_answered', {
          question_id: qid,
          answer,
          question_author: q ? q.author : undefined,
          option_one_votes: q ? q.optionOne.votes.length : undefined,
          option_two_votes: q ? q.optionTwo.votes.length : undefined
        })
      })
      .then(() => dispatch(hideLoading()))
  }
}