import {Component} from 'react'
import './index.css'

class UserProfile extends Component {
  renderUserProfile = () => {
    const {userDetails} = this.props
    const {profileImageUrl, name, shortBio} = userDetails
    return (
      <div>
        <img src={profileImageUrl} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderUserProfileFailureView = () => {
    const {getUserProfile} = this.props

    return (
      <div>
        <button type="button" className="button" onClick={getUserProfile}>
          Retry
        </button>
      </div>
    )
  }

  render() {
    const {userRequestAPIStatus, renderLoader} = this.props

    switch (userRequestAPIStatus) {
      case 'IN_PROGRESS':
        return renderLoader()
      case 'SUCCESS':
        return this.renderUserProfile()
      case 'FAILURE':
        return this.renderUserProfileFailureView()
      default:
        return null
    }
  }
}

export default UserProfile
