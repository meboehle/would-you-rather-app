import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import {
  TiArrowRightThick
 } from 'react-icons/ti/index'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
  state = {
    checked: false,
    id: '',
    toHome: false
  }

  handleLogin = (e) => {
    e.preventDefault()
    const { id } = this.state
    const { dispatch } = this.props

    dispatch(setAuthedUser(id))
  }

  onChecked = (e) => {
    const id = e.target.value
    this.setState({
      checked: true,
      id
    })
  }

  render() {
    const { users } = this.props

    if (this.state.toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <h3 className='login title'>
          Pick a User to Begin Playing
        </h3>
        <form className='login-form'>
          <input className='hidden-input'/>
          <div className='login-select'>
            {users && Object.values(users).map(user => (
              <label key={user.id} className='select-user'>
                <input
                  className='login-radio'
                  type='radio'
                  name='user'
                  value={user.id}
                  onChange={(event) => this.onChecked(event)}/>
                <img
                  src={user.avatarURL}
                  alt={`Avatar of ${user.name}`}
                  className='avatar'/>
                {user.name}
              </label>
            ))}
          </div>
          {this.state.checked && <div className='play-btn'>
            <button
              className='start-play'
              type='submit'
              onClick={this.handleLogin}>
              <span className='play-text'>Begin Playing</span>
              <TiArrowRightThick className='right-arrow-icon' />
            </button>
          </div>}
        </form>
        <div className='footer-creds'>
          Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    users
  }
}

export default withRouter(connect(mapStateToProps)(Login))