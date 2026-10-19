import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

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
        // Track question creation
        if (typeof pendo !== 'undefined') {
          pendo.track('question_created', {
            questionId: question.id,
            author: authedUser,
          })
        }
        return dispatch(addQuestion(question))
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
        // Track vote submission
        if (typeof pendo !== 'undefined') {
          pendo.track('vote_submitted', {
            questionId: qid,
            selectedOption: answer,
          })
        }
        return dispatch(answerQuestion(qid, answer, authedUser))
      })
      .then(() => dispatch(hideLoading()))
  }
}