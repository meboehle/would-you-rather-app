import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitData } from '../actions/shared'
import Login from './Login'
import Dashboard from './Dashboard'
import NavBar from './NavBar'
import QuestionDetails from './QuestionDetails'
import NewQuestion from './NewQuestion'
import NotFound from './404'
import LoadingBar from 'react-redux-loading'
import Leaderboard from './Leaderboard'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitData())
  }

  render() {
    return (
        <div>
          <LoadingBar/>
          <h1 className='game title'>Would You Rather?</h1>
          <div>
            {this.props.loading === true ? <Login/> :
              <div>
                <NavBar/>
                <Switch>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/question/:id' exact component={QuestionDetails} />
                  <Route path='/add' exact component={NewQuestion} />
                  <Route path='/leaderboard' exact component={Leaderboard} />
                  <Route component={NotFound} />
                </Switch>
              </div>}
          </div>
        </div>
    )
  }
}

function mapStateToProps ({authedUser}) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)