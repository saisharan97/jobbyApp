import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import {Component} from 'react'
import './index.css'

import {BsBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import {AiOutlineStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'

import Header from '../Header/index'
import SimilarJob from '../SimilarJob/index'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsData: [],
    jobDetailsAPIStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)

    if (response.ok === true) {
      const formatJobDetails = eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        companyWebsiteUrl: eachItem.company_website_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      })

      const formatLifeAtCompany = eachItem => ({
        description: eachItem.description,
        imageUrl: eachItem.image_url,
      })

      const formatSkill = eachItem => ({
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      })

      const formattedJobDetails = formatJobDetails(data.job_details)

      const formattedLifeAtCompany = formatLifeAtCompany(
        data.job_details.life_at_company,
      )

      const formattedSkillsList = data.job_details.skills.map(eachItem =>
        formatSkill(eachItem),
      )

      const formattedSimilarJobsList = data.similar_jobs.map(eachItem =>
        formatJobDetails(eachItem),
      )

      // console.log(formattedLifeAtCompany)

      this.setState({
        jobDetailsData: {
          formattedJobDetails,
          formattedLifeAtCompany,
          formattedSkillsList,
        },
        similarJobsData: formattedSimilarJobsList,
        jobDetailsAPIStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        jobDetailsAPIStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobDetailsView = () => {
    const {jobDetailsAPIStatus} = this.state
    if (jobDetailsAPIStatus === apiStatusConstants.success) {
      const {jobDetailsData, similarJobsData} = this.state
      const jobDetails = jobDetailsData.formattedJobDetails
      const skills = jobDetailsData.formattedSkillsList
      const LifeAtCompany = jobDetailsData.formattedLifeAtCompany

      return (
        <>
          <div className="job-details-item-container">
            <div style={{display: 'flex'}}>
              <div className="job-item-img-container">
                <img
                  src={jobDetails.companyLogoUrl}
                  alt="job details company logo"
                  className="job-item-img-prop"
                />
              </div>

              <div>
                <h1 className="job-item-heading">{jobDetails.title}</h1>
                <div style={{display: 'flex'}}>
                  <div className="react-icon">
                    <AiOutlineStar />
                  </div>
                  <p>{jobDetails.rating}</p>
                </div>
              </div>
            </div>

            <div style={{display: 'flex'}}>
              <div style={{display: 'flex'}}>
                <div className="react-icon">
                  <GoLocation />
                </div>
                <p>{jobDetails.location}</p>
              </div>

              <div style={{display: 'flex'}}>
                <div className="react-icon">
                  <BsBriefcaseFill />
                </div>
                <p>{jobDetails.employmentType}</p>
              </div>

              <p style={{flexGrow: 1, textAlign: 'end'}}>
                {jobDetails.packagePerAnnum}
              </p>
            </div>

            <hr />
            <div style={{display: 'flex'}}>
              <h1 style={{flexGrow: 1}}>Description</h1>
              <button type="button" className="visit-button">
                <a
                  href={jobDetails.companyWebsiteUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Visit
                  <BsBoxArrowUpRight style={{marginLeft: '10px'}} />
                </a>
              </button>
            </div>

            <p>{jobDetails.jobDescription}</p>

            <h1>Skills</h1>
            <ul className="skill-container">
              {skills.map(eachItem => (
                <li className="skill-item-container" key={eachItem.name}>
                  <img
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                    className="skill-img-prop"
                  />
                  <p>{eachItem.name}</p>
                </li>
              ))}
            </ul>

            <h1>Life At Company</h1>
            <div className="life-at-company-container">
              <p>{LifeAtCompany.description}</p>
              <img src={LifeAtCompany.imageUrl} alt="life at company" />
            </div>

            <h1>Similar Jobs</h1>
          </div>

          <ul className="similar-jobs-container">
            {similarJobsData.map(eachItem => (
              <SimilarJob eachItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </>
      )
    }
    if (jobDetailsAPIStatus === apiStatusConstants.failure)
      return this.renderJobDetailsFailureView()

    return null
  }

  renderJobDetailsFailureView = () => (
    <div style={{textAlign: 'center'}}>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <div>
        <button type="button" className="button" onClick={this.getJobDetails}>
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

  render() {
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    const {jobDetailsAPIStatus} = this.state

    return (
      <>
        <Header />
        {jobDetailsAPIStatus === apiStatusConstants.inProgress
          ? this.renderLoader()
          : this.renderJobDetailsView()}
      </>
    )
  }
}

export default JobItemDetails
