import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'

class Header extends Component {
  onclickLogoutButton = () => {
    const {history} = this.props

    // const jwtToken = Cookies.get('jwt_token')
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <ul className="̥nav-container">
        <Link to="/">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="header-logo-img-prop"
              alt="website logo"
            />
          </li>
        </Link>

        <li style={{display: 'flex'}}>
          <Link to="/">
            <p style={{marginRight: '20px'}}>Home</p>
          </Link>
          <Link to="jobs">
            <p>Jobs</p>
          </Link>
        </li>

        <li>
          <button
            type="button"
            className="button"
            onClick={this.onclickLogoutButton}
          >
            Logout
          </button>
        </li>
      </ul>
    )
  }
}

export default withRouter(Header)
