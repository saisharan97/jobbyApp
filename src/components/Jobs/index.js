import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import {Component} from 'react'
import './index.css'

// Components
import Header from '../Header/index'
import JobItem from '../JobItem/index'
import NoJobs from '../NoJobs/index'
import UserProfile from '../UserProfile/index'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    userDetails: '',
    userRequestAPIStatus: apiStatusConstants.initial,
    jobsList: [],
    jobsListAPIStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentType: '',
    minimumPackage: '',
  }

  componentDidMount() {
    this.getUserProfile()
    this.getJobs()
  }

  getUserProfile = async () => {
    this.setState({
      userRequestAPIStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/profile`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response.status)

    if (response.ok === true) {
      const formattedData = {
        profileImageUrl: data.profile_details.profile_image_url,
        name: data.profile_details.name,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        userDetails: formattedData,
        userRequestAPIStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        userRequestAPIStatus: apiStatusConstants.failure,
      })
    }
  }

  getJobs = async () => {
    this.setState({jobsListAPIStatus: apiStatusConstants.inProgress})
    const {searchInput, employmentType, minimumPackage} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchInput}`

    console.log(url)

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const formattedData = eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      })

      const jobsListFromServer = data.jobs
      const formattedJobsList = jobsListFromServer.map(eachItem =>
        formattedData(eachItem),
      )

      this.setState({
        jobsList: [...formattedJobsList],
        jobsListAPIStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        jobsListAPIStatus: apiStatusConstants.failure,
      })
    }
  }

  setSearchInputFn = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickEmploymentFilter = async event => {
    // console.log(event.target.form)
    console.log(1)

    const checkedList = []

    for (let i = 0; i < 4; i += 1) {
      console.log(event.target.form[i].checked)
      if (event.target.form[i].checked === true) {
        checkedList.push(event.target.form[i].id)
      }
      console.log(checkedList.join(','))
    }

    const joinedString = checkedList.join(',')
    await this.setState(
      {
        employmentType: joinedString,
      },
      this.getJobs,
    )
  }

  onClickSalaryFilter = async event => {
    // console.log(1)

    this.setState(
      {
        minimumPackage: event.target.id,
      },
      this.getJobs,
    )
  }

  renderJobsDisplayView = jobsList => {
    const {jobsListAPIStatus} = this.state

    if (jobsListAPIStatus === apiStatusConstants.success) {
      return (
        <div className="job-items-container">
          <ul className="filter-container">
            {jobsList.length === 0 ? (
              <NoJobs />
            ) : (
              jobsList.map(eachItem => (
                <JobItem eachItem={eachItem} key={eachItem.id} />
              ))
            )}
          </ul>
        </div>
      )
    }
    if (jobsListAPIStatus === apiStatusConstants.failure) {
      return this.renderJobsDisplayFailureView()
    }
    return null
  }

  renderJobsDisplayFailureView = () => (
    <div style={{textAlign: 'center'}}>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <div>
        <button type="button" className="button" onClick={this.getJobs}>
          Retry
        </button>
      </div>
    </div>
  )

  renderLoader = () => (
    <div
      className="loader-container"
      //   testid="loader"
      style={{color: '#ffffff'}}
    >
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onSubmitSearch = event => {
    event.preventDefault()
    this.getJobs()
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    const {
      userDetails,
      userRequestAPIStatus,
      jobsList,
      jobsListAPIStatus,
      searchInput,
    } = this.state

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="user-profile-and-filter-container">
            <div className="user-profile-container">
              <UserProfile
                userRequestAPIStatus={userRequestAPIStatus}
                userDetails={userDetails}
                getUserProfile={this.getUserProfile}
                renderLoader={this.renderLoader}
              />
            </div>

            <hr />

            <div>
              <form className="filter-container">
                <h1>Type of Employment</h1>
                {employmentTypesList.map(eachItem => (
                  <div key={eachItem.employmentTypeId}>
                    <input
                      type="checkbox"
                      id={eachItem.employmentTypeId}
                      value={eachItem.label}
                      onClick={this.onClickEmploymentFilter}
                    />
                    <label htmlFor={eachItem.employmentTypeId}>
                      {eachItem.label}
                    </label>
                  </div>
                ))}
              </form>
            </div>

            <hr />

            <div>
              <ul className="filter-container">
                <h1>Salary Range</h1>
                {salaryRangesList.map(eachItem => (
                  <li key={eachItem.salaryRangeId}>
                    <input
                      type="radio"
                      id={eachItem.salaryRangeId}
                      name="salary"
                      value={eachItem.salaryRangeId}
                      onClick={this.onClickSalaryFilter}
                    />
                    <label htmlFor={eachItem.salaryRangeId}>
                      {eachItem.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="jobs-details-container">
            <div className="search-input-container">
              <form
                style={{flexGrow: 1, display: 'flex'}}
                onSubmit={this.onSubmitSearch}
              >
                <input
                  type="search"
                  onChange={this.setSearchInputFn}
                  className="input-element"
                  placeholder="Search"
                  value={searchInput}
                />
              </form>

              <button
                type="button"
                className="search-icon-container"
                // testid="searchButton"
                onClick={this.getJobs}
              >
                <BsSearch />
              </button>
            </div>

            {jobsListAPIStatus === apiStatusConstants.inProgress
              ? this.renderLoader()
              : this.renderJobsDisplayView(jobsList)}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
