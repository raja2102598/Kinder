import React from "react"
// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// pages
import ComponentHome from "./components/homecomp/componentHome"
import Login from "./components/Login/login.js"
import Signup from "./components/signup/signup"

// navbar
// import Navbar from "./Navbar"
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ComponentHome />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
