import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    vaccinationDataList: {},
    isLoading: false,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({
      isLoading: true,
      apiStatus: apiStatusConstants.inProgress,
    })
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    try {
      const response = await fetch(vaccinationDataApiUrl)
      if (response.ok) {
        const fetchedData = await response.json()
        this.setState({
          vaccinationDataList: fetchedData,
          isLoading: false,
          apiStatus: apiStatusConstants.success,
        })
      } else if (response.status === 401) {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      } else {
        throw new Error('Failed to fetch data')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({isLoading: false, apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {vaccinationDataList} = this.state
    const {
      last_7_days_vaccination: last7DaysVaccination,
      vaccination_by_age: vaccinationByAge,
      vaccination_by_gender: vaccinationByGender,
    } = vaccinationDataList

    return (
      <div className="app-container">
        <div className="bg-container">
          <div className="logo-cont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              className="logo-img"
              alt="website logo"
            />
            <p className="logo-title">Co-WIN</p>
          </div>
          <h1 className="title">CoWIN Vaccination in India</h1>
          <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
          <VaccinationByGender vaccinationByGender={vaccinationByGender} />
          <VaccinationByAge vaccinationByAge={vaccinationByAge} />
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h2>Something went wrong</h2>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    return (
      <div className="app-container">
        <div className="bg-container">
          <div className="logo-cont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              className="logo-img"
              alt="website logo"
            />
            <p className="logo-title">Co-WIN</p>
          </div>
          <h1 className="title">CoWIN Vaccination in India</h1>
          {apiStatus === apiStatusConstants.success && this.renderSuccessView()}
          {apiStatus === apiStatusConstants.failure && this.renderFailureView()}
          {apiStatus === apiStatusConstants.inProgress &&
            this.renderLoadingView()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
