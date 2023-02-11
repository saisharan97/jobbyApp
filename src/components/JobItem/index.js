import {BsBriefcaseFill} from 'react-icons/bs'
import {AiOutlineStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'

import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'

class JobItem extends Component {
  render() {
    const {eachItem} = this.props
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      jobDescription,
      id,
      packagePerAnnum,
    } = eachItem
    // console.log(id)

    return (
      <Link to={`/jobs/${id}`}>
        <li className="job-item-container">
          <div style={{display: 'flex'}}>
            <div className="job-item-img-container">
              <img
                src={companyLogoUrl}
                alt="company logo"
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
            <div className="react-icon">
              <GoLocation />
            </div>
            <p>{location}</p>

            <div className="react-icon">
              <BsBriefcaseFill />
            </div>
            <p>{employmentType}</p>

            <p style={{flexGrow: 1, textAlign: 'end'}}>{packagePerAnnum}</p>
          </div>

          <hr />
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </li>
      </Link>
    )
  }
}

export default JobItem
