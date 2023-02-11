import {Component} from 'react'
import './index.css'

import {BsBriefcaseFill} from 'react-icons/bs'
import {AiOutlineStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'

class SimilarJob extends Component {
  render() {
    const {eachItem} = this.props
    const {
      companyLogoUrl,
      title,
      rating,
      jobDescription,
      location,
      employmentType,
    } = eachItem
    return (
      <div className="similar-job-item-container">
        <div style={{display: 'flex'}}>
          <div className="job-item-img-container">
            <img
              src={companyLogoUrl}
              alt="similar job company logo"
              className="job-item-img-prop"
            />
          </div>

          <div>
            <h1 className="job-item-heading">{title}</h1>
            <div style={{display: 'flex'}}>
              <div className="react-icon">
                <AiOutlineStar />
              </div>
              <p>{rating}</p>
            </div>
          </div>
        </div>

        <div style={{display: 'flex'}}>
          <h1 style={{flexGrow: 1}}>Description</h1>
        </div>

        <p>{jobDescription}</p>

        <div style={{display: 'flex'}}>
          <div className="react-icon">
            <GoLocation />
          </div>
          <p>{location}</p>
          <div className="react-icon">
            <BsBriefcaseFill />
          </div>
          <p>{employmentType}</p>
        </div>
      </div>
    )
  }
}

export default SimilarJob
