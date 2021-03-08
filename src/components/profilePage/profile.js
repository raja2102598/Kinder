import React, { useState, useEffect } from "react"
import { Link, useParams, Redirect, useLocation } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import { Grid, Button } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"
import Header from "../Feeds/header"
const axios = require("axios")
var CryptoJS = require("crypto-js")

function decrypt(value) {
  var bytes = CryptoJS.AES.decrypt(value, process.env.REACT_APP_SECRET_KEY)
  var originalText = bytes.toString(CryptoJS.enc.Utf8)
  return originalText
}
function encrypt(value) {
  return CryptoJS.AES.encrypt(
    value,
    process.env.REACT_APP_SECRET_KEY
  ).toString()
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}))

function Profile(props) {
  // var person = ""
  const { userid } = useParams()
  const [person, setPerson] = useState({
    name: "",
    bio: "",
    city: "",
    dob: "",
    email: "",
    gender: "",
    hobby: "",
    interests: "",
    status: "",
  })
  //   console.log(userid)
  useEffect(() => {
    fetchUser()
    // console.log(fetchUser())
  }, [])
  function fetchUser() {
    axios
      .get("http://localhost:5000/getprofile", {
        params: {
          user: userid,
        },
      })
      .then(function (response) {
        // console.log(response.data)
        if (response.data.status === "Success") {
          // console.log(response.data)
          var resp = response.data
          setPerson({
            name: resp.name,
            bio: decrypt(resp.bio),
            city: decrypt(resp.city),
            dob: resp.dob.substring(0, resp.dob.indexOf("T")),
            email: resp.email,
            gender: decrypt(resp.gender),
            hobby: decrypt(resp.hobby),
            interests: decrypt(resp.interests),
            status: resp.status,
          })
          // var bytes = CryptoJS.AES.decrypt(
          //   "U2FsdGVkX1+KPj97VVD5Mv3JRZmEnQyksNlgerWM/SE=",
          //   "FINALYEARPROJECT2021"
          // )
          // var originalText = bytes.toString(CryptoJS.enc.Utf8)
          // // console.log(originalText)
          // console.log(decrypt(resp.bio))
          // return response.data
          // person = response.data
          // setPerson(response.data)
        } else if (response.data.status === "Failed") {
          // setIsUser(false)
          // return null
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const location = useLocation()
  const classes = useStyles()
  return (
    <div>
      {location.state?.user ? (
        <div>
          <Header user_id={userid} name={person.name}></Header>
          <Grid container style={{ marginTop: "2%" }}>
            <Grid item xs={12} sm={4}>
              <img
                src="https://picsum.photos/150/150"
                alt="image"
                style={{
                  borderRadius: "50%",
                  margin: "20px",
                  marginLeft: "65%",
                }}
                height="150"
                width="150"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography
                component="h1"
                variant="h4"
                style={{ marginTop: "60px" }}
                gutterBottom
              >
                {person.name}
              </Typography>
              <Typography component="h1" variant="body1">
                {person.bio}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="outlined"
                style={{ marginTop: "60px" }}
                color="default"
              >
                <Router forceRefresh={true}>
                  <Link
                    style={{ color: "#000" }}
                    to={{
                      pathname: "/EditProfile/" + userid,
                      state: { from: props.location, user: true },
                    }}
                  >
                    Edit Profile
                  </Link>
                </Router>
              </Button>
            </Grid>
          </Grid>
          <hr
            style={{
              color: "#EBEBEB",
              backgroundColor: "#EBEBEB",
              height: 0.3,
              borderColor: "#EBEBEB",
            }}
          />
        </div>
      ) : (
        <Router forceRefresh={true}>
          <Redirect to="/login"></Redirect>
        </Router>
      )}
    </div>
  )
}

export default Profile
