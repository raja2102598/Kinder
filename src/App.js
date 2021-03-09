import React from "react"
// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Feeds from "./components/Feeds/feeds"
// pages
import ComponentHome from "./components/homecomp/componentHome"
import Login from "./components/Login/login.js"
import EditProfile from "./components/profilePage/editProfile"
import Profile from "./components/profilePage/profile"
import SearchHome from "./components/search/searchHome"
import Signup from "./components/signup/signup"

// navbar
// import Navbar from "./Navbar"
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/Kinder">
          <ComponentHome />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/feeds/:userid" children={<Feeds />}></Route>
        <Route path="/profile/:userid" children={<Profile />}></Route>
        <Route path="/EditProfile/:userid" children={<EditProfile />}></Route>
        <Route path="/search/:query" children={<SearchHome />}></Route>
      </Switch>
    </Router>
  )
}

export default App
