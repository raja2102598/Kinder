import React, { useState, useEffect } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

import { Link as LinkRoute, Redirect } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import validator from "validator"

const axios = require('axios');


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Kinder
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Flag=(props)=>{
  return(
  <Typography component="h2" variant="body1" color="secondary">
    {props.text}
  </Typography>
  )
}

export default function Login() {
  const [person, setPerson] = useState({ email: "", password: "" })
  const [emailStatus, setemailStatus] = useState(true)
  const [passwordStatus, setpasswordStatus] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userid, setuserid] = useState("")
  const [errorMsg,seterrorMsg]=useState(false)

  

  const classes = useStyles()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setPerson({ ...person, [name]: value })
    // console.log(person);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setemailStatus(false)
    setpasswordStatus(false)
    // console.log("came1");


    // console.log(person)
    // console.log(email, password)
    if (validator.isEmail(person.email)) {
      // console.log("came1");
      setemailStatus(true)
    }
    if (person.password.length >= 8) {
      // console.log("came3");
      setpasswordStatus(true)
    }

    if (validator.isEmail(person.email) && person.password.length >= 8) {
      // console.log("hello");
      axios.post("http://localhost:5000/login", {
          email: person.email,
          password: person.password,
        })
        .then(function (response) {
          console.log(response)
          if (response.data.status === "Success") {
            setIsLoggedIn(true)
            // console.log(isLoggedIn,errorMsg);
            setuserid(response.data.user_id)
          } else if (response.data.status === "Failed") {
            setIsLoggedIn(false)
            seterrorMsg(true)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  return (
    <Router forceRefresh={true}>
    {isLoggedIn?<Redirect to={'/feeds/'+userid}></Redirect>:
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {errorMsg?<Flag text="Email or Password Not Found"></Flag>:""}
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={person.email}
              onChange={handleChange}
              autoFocus
              error={!emailStatus}
              helperText={emailStatus? "":"Please enter a valid Email"}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={person.password}
              onChange={handleChange}
              autoComplete="current-password"
              error={!passwordStatus}
              helperText={
                !passwordStatus
                  ? "Please Enter A Strong Password"
                  : ""
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <LinkRoute to="/signup  " id="loginLink">
                  <p style={{ color: "#005BB8" }}>
                    Don't have an account? Sign Up
                  </p>
                </LinkRoute>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>}
    </Router>
  )
}
