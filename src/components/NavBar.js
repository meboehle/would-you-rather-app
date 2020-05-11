import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar () {
  return (
    <nav className='nav'>
      <NavLink to='/' exact activeClassName='active'>
        home
      </NavLink>
      <NavLink to='/addQuestion' activeClassName='active'>
        add question
      </NavLink>
      <NavLink to='/leaderboard' activeClassName='active'>
        leaderboard
      </NavLink>
      <NavLink to='/login'>
        logout
      </NavLink>
    </nav>
  )
}