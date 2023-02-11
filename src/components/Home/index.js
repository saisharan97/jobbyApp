import Cookies from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'

import {Component} from 'react'
import './index.css'
import Header from '../Header/index'

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="home-container">
        <Header />

        <div className="home-content">
          <div>
            <h1>Find The Job That Fits Your Life</h1>
            <p>
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential
            </p>
            <Link to="/jobs">
              <button
                type="button"
                className="button"
                onClick={this.onclickLogoutButton}
              >
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
