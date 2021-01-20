import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserAPI from './api/UserAPI';
import AirportAPI from './api/AirportAPI';
import HomePage from './pages/HomePage/HomePage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import SignupPage from './pages/SignupPage/SignupPage';
import DetailPage from './pages/DetailPage/DetailPage';
import LoginPage from './pages/LoginPage/LoginPage';
import isLoggedInContext from './contexts/isLoggedInContext.js';
import UserContext from './contexts/UserContext.js';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import { RecoilRoot } from 'recoil';
import SearchBox from './components/SearchBox/SearchBox'
import FavoritesPage from './pages/Favorites/FavoritesPage'

const App = () => {

  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showSearchBox, setShowSearchBox] = useState(true)
  

  // calls method on page load to look for token 
  useEffect(() => {
    getUser()
  }, [])

  // calls amadeus to get token
  useEffect(() => {
    getAmadeusToken()
  })

  // get amadeus token
  const getAmadeusToken = async () => {
    let response = await AirportAPI.getAccessToken()
    let data = await response.json()
    localStorage.setItem('amadeusToken', data.access_token)
  }

  // see if there is a user token in local storage
  // if there is, call UserApi function getLoggedInUser to get user who is logged in
  // set state accordingly if there is a token
  const getUser = async () => {
    let token = localStorage.getItem('auth-user')
    if(token !== 'null'){
      let response = await UserAPI.getLoggedInUser(localStorage.getItem('auth-user'))
      let data = await response.json()
      if(data) {
        setIsLoggedIn(true)
        setUser(data.user)
        localStorage.setItem('user', data)
      }
    }
  }


  // handle login by calling UserApi login function
  // sets token in local storage if there is one
  // sets state for the user and logged in status
  // gets passed to Login Page
  const handleLogin = async (event) => {
    event.preventDefault()
    let userCredentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    let response = await UserAPI.login(userCredentials)
    let data = await response.json()
    localStorage.setItem('userId', data?.user?.id);
    if (data.token) {
      localStorage.setItem('auth-user', data.token)
      localStorage.setItem('user', data.user)
      setIsLoggedIn(true)
      setUser(data.user)
    }
  }

  // handle logout by clearing local storage of token
  // sets state for user and logged in status
  // gets passed to AppNav for navbar use
  const handleLogout = async (event) => {
    localStorage.setItem('auth-user', null)
    localStorage.setItem('user', null)
    localStorage.setItem('amadeusToken', null)
    setIsLoggedIn(false)
    setUser(null)
  }


  // Render - show pages with certain elements
  const renderLoginPage = () => {
    setShowSearchBox(false)
    return (
      <LoginPage handleLogin={ handleLogin } />
    )
  }

  const renderSignupPage = () => {
    setShowSearchBox(false)
    return (
      <SignupPage />
    )
  }

  const renderHomePage = () => {
    setShowSearchBox(true)
    return(
      <HomePage />
    )
  }

  const renderSearchResultsPage = () => {
    setShowSearchBox(true)
    return(
      <SearchResultsPage />
    )
  }

  const renderDetailPage = (props) => {
    setShowSearchBox(true)
    return(
      <DetailPage props={props}/>
    )
  }

  const renderFavoritesPage = (props) => {
    setShowSearchBox(false)
    return(
      <FavoritesPage props={props}/>
    )
  }


  return (
    <div>
      <RecoilRoot>
        <Router>
          <isLoggedInContext.Provider value={{ isLoggedIn: isLoggedIn, setIsLoggedIn: handleLogin }}>
            <UserContext.Provider value={{ user: user, setUser: handleLogin }}>
              <Navbar handleLogout={handleLogout} />
                {
                  showSearchBox
                  &&
                  <div style={{marginLeft: "100px", marginRight:"200px"}}>
                    <SearchBox />
                  </div>
                }
              <Switch>
                <Route exact path='/' component={renderHomePage}/>
                <Route exact path='/login' render={renderLoginPage}/>
                <Route exact path='/signup' component={renderSignupPage}/>
                <Route exact path='/results' component={renderSearchResultsPage}/>
                <Route exact path='/favorites' component = {renderFavoritesPage}/>
                <Route exact path='/details/:airportCode' component={renderDetailPage}/>
              </Switch>
            </UserContext.Provider>
          </isLoggedInContext.Provider>
        </Router>
      </RecoilRoot>
    </div>
  )
}

export default App