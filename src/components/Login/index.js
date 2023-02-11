import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import './index.css'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isWarningTextVisible: '',
    errorMessage: '',
  }

  onchangeUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onchangePasswordInput = event => {
    this.setState({password: event.target.value})
  }

  onSuccessOfLogin = jwtToken => {
    const {history} = this.props
    // console.log(jwtToken)

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    // console.log('Login Success')
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)

    if (response.status === 200) {
      this.setState({username: '', password: '', isWarningTextVisible: false})
      this.onSuccessOfLogin(data.jwt_token)
    } else {
      this.setState({isWarningTextVisible: true, errorMessage: data.error_msg})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, isWarningTextVisible, errorMessage} = this.state

    return (
      <div className="login-container">
        <div style={{textAlign: 'left'}}>
          <h1>Sample Credentials</h1>
          <p>Username: rahul</p>
          <p>Password: rahul@2021</p>
        </div>

        <div className="login-form">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="login-img-prop"
              alt="website logo"
            />
          </div>

          <form onSubmit={this.onSubmitForm}>
            <label htmlFor="username-input">USERNAME</label>
            <br />
            <input
              id="username-input"
              className="input-element"
              type="input"
              placeholder="Username"
              onChange={this.onchangeUsernameInput}
              value={username}
            />
            <br />

            <label htmlFor="password-input">PASSWORD</label>
            <br />
            <input
              id="password-input"
              className="input-element"
              type="password"
              placeholder="Password"
              onChange={this.onchangePasswordInput}
              value={password}
            />

            <div>
              <button type="submit" className="login-button">
                Login
              </button>
            </div>

            {isWarningTextVisible && (
              <p className="warning-text">*{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
