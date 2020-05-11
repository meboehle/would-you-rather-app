import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions,
      }
      // TODO: FIX THIS
    case ADD_QUESTION :
      return {
        users: {
          ...action.users,
          [action.loggedInUser]: {
            ...action.users[action.loggedInUser],
            questions: action.users[action.loggedInUser].questions.concat([action.question.id])
          }
        },
        questions: {
          ...action.questions,
          [action.question.id]: action.question
        }
      }
    case ANSWER_QUESTION :
      return {
        ...state,
        [action.question.id]: action.question
      }
    default :
      return state
  }
}