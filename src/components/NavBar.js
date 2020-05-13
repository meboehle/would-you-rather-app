import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
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
          <button className='logout-btn' to='/' onClick={this.onLogout}>
            logout
          </button>
        </nav>
        <Welcome/>
      </div>
    )
  }
}

export default connect()(NavBar)