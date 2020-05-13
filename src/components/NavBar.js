import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import Welcome from './Welcome'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class NavBar extends Component {
  onLogout = () => {
    const { dispatch } = this.props
    dispatch(setAuthedUser(null))
  }

  render() {
    return (
      <div>
        <nav className='nav'>
          <NavLink to='/' exact activeClassName='active'>
            home
          </NavLink>
          <NavLink to='/add-question' activeClassName='active'>
            add question
          </NavLink>
          <NavLink to='/leaderboard' activeClassName='active'>
            leaderboard
          </NavLink>
          <NavLink to='/login' activeClassName='active' onClick={this.onLogout}>
            logout
          </NavLink>
        </nav>
        <Welcome/>
      </div>
    )
  }
}

export default withRouter(connect()(NavBar))