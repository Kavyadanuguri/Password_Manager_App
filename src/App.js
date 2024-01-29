import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    DetailsList: [],
    websiteName: '',
    userName: '',
    password: '',
    isValue: false,
    searchInput: '',
  }

  getResult = event => {
    const {DetailsList} = this.state
    const searchResult = DetailsList.filter(each =>
      each.websiteName.toLowerCase().includes(event.target.value.toLowerCase()),
    )
    this.setState({DetailsList: searchResult})
  }

  onDeleteItem = id => {
    const {DetailsList} = this.state
    const filteredList = DetailsList.filter(each => each.id !== id)
    this.setState({DetailsList: filteredList})
  }

  onPrevent = event => {
    event.preventDefault()

    const {DetailsList, websiteName, userName, password} = this.state
    const newList = {
      id: uuidv4(),
      websiteName,
      userName,
      password,
    }
    this.setState(prevState => ({
      DetailsList: [...prevState.DetailsList, newList],
      websiteName: '',
      userName: '',
      password: '',
    }))
    console.log(DetailsList)
  }

  onCheckValue = () => {
    this.setState(prevState => ({isValue: !prevState.isValue}))
  }

  onWebsite = event => {
    this.setState({websiteName: event.target.value})
  }

  onUsername = event => {
    this.setState({userName: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {
      DetailsList,
      websiteName,
      userName,
      password,
      isValue,
      searchInput,
    } = this.state
    console.log(isValue)
    console.log(searchInput)
    const isTrue = DetailsList.length !== 0
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="image1"
        />
        <div className="container1">
          <form className="form-con1" id="forms" onSubmit={this.onPrevent}>
            <h1 className="heading1">Add New Password</h1>
            <div className="white-con">
              <button type="button" className="img-b1">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="web-img"
                />
              </button>
              <hr className="input-hr" />
              <input
                type="text"
                className="app-input-element"
                value={websiteName}
                placeholder="Enter Website"
                onChange={this.onWebsite}
              />
            </div>
            <div className="white-con">
              <button type="button" className="img-b1">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                  alt=" username"
                  className="web-img"
                />
              </button>
              <hr className="input-hr" />
              <input
                type="text"
                className="app-input-element"
                placeholder="Enter Username"
                value={userName}
                onChange={this.onUsername}
              />
            </div>
            <div className="white-con">
              <button type="button" className="img-b1">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                  className="web-img"
                />
              </button>
              <hr className="input-hr" />
              <input
                type="password"
                className="app-input-element"
                placeholder="Enter Password"
                value={password}
                onChange={this.onPassword}
              />
            </div>
            <div className="end-con">
              <button type="submit" className="app-button">
                Add
              </button>
            </div>
          </form>
          <div className="form-con2">
            <img
              className="app-image1"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            />
          </div>
          <div className="form-con3">
            <img
              className="app-image2"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            />
          </div>
        </div>
        <div className="container2">
          <div className="below-con2">
            <div className="below-con1">
              <h1 className="heading2">Your Passwords</h1>
              <p className="c1">{DetailsList.length}</p>
            </div>
            <div className="white-con">
              <button type="button" className="img-below">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="web-img"
                />
              </button>
              <hr className="input-hr" />

              <input
                type="search"
                className="app-input-element1"
                placeholder="Search"
                onChange={this.getResult}
              />
            </div>
          </div>
          <hr className="app-hr" />
          <div className="check-con">
            <input
              type="checkbox"
              id="checkbox"
              className="check-el"
              onChange={this.onCheckValue}
            />
            <label htmlFor="checkbox" className="pass-h1">
              Show Passwords
            </label>
          </div>
          {isTrue && (
            <ul className="ul-container">
              {DetailsList.map(each => (
                <li className="list-container" key={each.id}>
                  <div className="below-con2">
                    <p className="icon-color">
                      {each.userName[0].toUpperCase()}
                    </p>
                    <div className="text-con3">
                      <p className="text-h3">{each.websiteName}</p>
                      <p className="text-hh4">{each.userName}</p>
                      {!isValue && (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                          className="text-p3"
                        />
                      )}
                      {isValue && <p className="password">{each.password}</p>}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="delete-icon-button"
                    data-testid="delete"
                    onClick={() => this.onDeleteItem(each.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete-icon"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
          {!isTrue && (
            <div className="noResults-container">
              <img
                className="noImage"
                alt="no passwords"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
              />
              <p className="no-text">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
