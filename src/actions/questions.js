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

function addQuestion (question, users, loggedInUser, questions) {
  return {
    type: ADD_QUESTION,
    question,
    users,
    loggedInUser,
    questions
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { loggedInUser, users, questions } = getState()
    console.log(loggedInUser)
    console.log(users)
    console.log(questions)
    dispatch(showLoading())

    return saveQuestion({
      author: loggedInUser,
      optionOneText,
      optionTwoText
    })
      .then((question) => dispatch(addQuestion(question, users, loggedInUser, questions)))
      .then(() => dispatch(hideLoading()))
  }
}

function answerQuestion ({ qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    qid,
    answer
  }
}

export function handleAnswerQuestion ({ qid, answer }) {
  return (dispatch, getState) => {
    const { loggedInUser } = getState()

    dispatch(showLoading())

    return saveQuestionAnswer({
      qid,
      answer,
      loggedInUser
    })
      .then((question) => dispatch(answerQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}