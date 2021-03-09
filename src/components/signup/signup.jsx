import React, { useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { Link as LinkRoute, Redirect, Route } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import validator from "validator"

const axios = require("axios")

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit">Kinder</Link> {new Date().getFullYear()}
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const handleSubmit = (e) => {
  e.preventDefault()
  console.log(e.target.values)
}

const Flag = (props) => {
  return (
    <Typography component="h2" variant="body1" color="secondary">
      {props.text}
    </Typography>
  )
}

export default function SignUp() {
  const [person, setPerson] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirm_password: "",
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [emailStatus, setemailStatus] = useState(false)
  const [passwordStatus, setpasswordStatus] = useState(true)
  const [userid, setuserid] = useState("")

  const classes = useStyles()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setPerson({ ...person, [name]: value })
    console.log(person)
  }

  const handleSubmit = (e) => {
    setpasswordStatus(false)
    e.preventDefault()
    console.log(person)
    if (
      validator.isEmail(person.email) &&
      person.password.length >= 8 &&
      person.fname.length >= 0 &&
      person.lname.length >= 0 &&
      person.password === person.confirm_password
    ) {
      // console.log("hello")
      setpasswordStatus(true)
      axios
        .post("http://localhost:5000/createAcc", {
          firstName: person.fname,
          lastName: person.lname,
          email: person.email,
          password: person.password,
        })
        .then(function (response) {
          console.log(response.data)
          // {<Redirect to={"/login"}></Redirect>
          if (response.data.status === "Success") {
            setIsLoggedIn(true)
            setuserid(response.data.user_id)
            // console.log("hello")
            // console.log(isLoggedIn)
          } else if (response.data.status === "Failed") {
            setIsLoggedIn(false)
            setemailStatus(true)
            // console.log("hello wolrd")
            // console.log(isLoggedIn)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      setpasswordStatus(false)
      console.log("bye")
    }
  }

  return (
    <Router forceRefresh={true}>
      {isLoggedIn ? (
        <Redirect to={"/feeds/" + userid}></Redirect>
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            {emailStatus ? (
              <Flag text="Email already in use.Please Sign in !"></Flag>
            ) : (
              ""
            )}
            {passwordStatus ? "" : <Flag text="Passwords doesn't match"></Flag>}
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="fname"
                    variant="outlined"
                    required
                    fullWidth
                    id="fname"
                    label="First Name"
                    autoFocus
                    value={person.fname}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lname"
                    label="Last Name"
                    name="lname"
                    autoComplete="lname"
                    value={person.lname}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={person.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={person.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                    id="confirm_password"
                    autoComplete="current-password"
                    value={person.confirm_password}
                    onChange={handleChange}
                  />
                </Grid>

                {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <LinkRoute to="/login" id="loginLink">
                    <p style={{ color: "#005BB8" }}>
                      Already have an account? Sign in
                    </p>
                  </LinkRoute>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      )}
    </Router>
  )
}
