import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitData } from '../actions/shared'
import Login from './Login'
import Dashboard from './Dashboard'
import NavBar from './NavBar'
import QuestionDetails from './QuestionDetails'
import NewQuestion from './NewQuestion'
import Welcome from './Welcome'
import LoadingBar from 'react-redux-loading'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitData())
  }

  render() {
    const { authedUser } = this.props
    return (
      <Router>
        <div>
          <h1 className='game title'>Would You Rather?</h1>
          <div>
            {!authedUser &&
              <h3 className='login title'>
                Pick a User to Begin Playing
              </h3>}
            {authedUser && <NavBar/>}
            <LoadingBar/>
            {authedUser && <Welcome/>}
            <Route exact path='/' render={() => (
              authedUser ? (
                <Redirect to='/'/>
              ) : (
                <Redirect to='/login'/>
              )
            )}/>
            <Route path='/' exact component={Dashboard} />
            <Route path='/login' component={Login} />
            <Route path='/question/:id' component={QuestionDetails} />
            <Route path='/addQuestion' component={NewQuestion} />
          </div>
        </div>
      </Router>
    )
  }
}

function mapStateToProps ({authedUser}) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App)