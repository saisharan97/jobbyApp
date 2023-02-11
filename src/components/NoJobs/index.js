import {Component} from 'react'
import './index.css'

class NoJobs extends Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img-prop"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }
}

export default NoJobs
