import React, { Component } from 'react'
import { Route, withRouter , Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitData } from '../actions/shared'
import Login from './Login'
import Dashboard from './Dashboard'
import NavBar from './NavBar'
import QuestionDetails from './QuestionDetails'
import NewQuestion from './NewQuestion'
// import NotFound from './404'
import LoadingBar from 'react-redux-loading'
import Leaderboard from './Leaderboard'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitData())
    // if (!this.props.authedUser) {
    //   this.props.history.push('/login')
    // }
  }

  render() {
    return (
        <div>
          <LoadingBar/>
          <h1 className='game title'>Would You Rather?</h1>
          <div>
            {!this.props.authedUser ? <Redirect to='/login' /> : <Redirect to='/' />}
            <Route path='/login' component={Login} />
            {this.props.loading === true ? null :
              <div>
                <NavBar/>
                <Route path='/' exact component={Dashboard} />
                <Route path='/question/:id' component={QuestionDetails} />
                <Route path='/addQuestion' component={NewQuestion} />
                <Route path='/leaderboard' component={Leaderboard} />
              </div>}
          </div>
        </div>
    )
  }
}

function mapStateToProps ({authedUser}) {
  return {
    authedUser,
    loading: authedUser === null
  }
}

export default withRouter(connect(mapStateToProps)(App))