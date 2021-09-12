import React, { useState, useEffect } from "react"
import { Link, useParams, Redirect, useLocation } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import { Grid, Button } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"
import Header from "../Feeds/header"
import Posts from "../Feeds/posts"
import timeDifference from "../../helpers/timeDifference"
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

function ViewProfile(props) {
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
    pic_url: "",
  })
  const [posts, setposts] = useState([])

  //   console.log(userid)
  useEffect(() => {
    fetchUser()
    fetchPosts()
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
            pic_url: resp.user_pic_url,
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

  function fetchPosts() {
    axios
      .get("http://localhost:5000/getPosts", {
        params: {
          user_id: userid,
        },
      })
      .then(function (response) {
        if (response.data != null) {
          var resp = response.data
          setposts(resp)
          console.log(resp)
        } else if (response.data === null) {
          console.log("Failed")
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }
  const location = useLocation()
  const classes = useStyles()
  return (
    <div>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"
      ></script>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
      />
      {location.state?.seeUser ? (
        <div>
          <Header
            user_id={location.state?.currentUserId}
            name={location.state?.currentUserName}
            picurl={location.state?.currentUserPic}
          ></Header>
          <h1 class="display-4 text-center pb-3">Profile</h1>
          <Grid container style={{ marginTop: "2%" }}>
            <Grid item xs={12} sm={4}>
              <img
                src={
                  person.pic_url.length > 0
                    ? person.pic_url
                    : "https://firebasestorage.googleapis.com/v0/b/privacynet-faafb.appspot.com/o/1024px-User-avatar.svg.png?alt=media&token=4e29312b-cc8e-4d2e-be44-581457caea30"
                }
                alt="No Picture"
                style={{
                  borderRadius: "50%",
                  margin: "20px",
                  marginLeft: "65%",
                }}
                height="160"
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
          </Grid>
          <hr
            style={{
              height: 0.3,
              width: "70%",
              margin: "auto",
            }}
          />
          <>
            <div className="display-4 text-center m-3 pb-5">
              {person.name.capitalize() + " Posts"}
            </div>
          </>
          {posts.length > 0 ? (
            posts.reverse().map((post) => {
              return (
                <Posts
                  avatarurl={person.pic_url}
                  nickname={person.name}
                  imageurl={post.photo_url}
                  imageCaption={post.caption}
                  time={timeDifference(Date.now(), new Date(post.upload_time))}
                />
              )
            })
          ) : (
            <div className="text-center">No Posts</div>
          )}
        </div>
      ) : (
        <Router forceRefresh={true}>
          <Redirect to="/login"></Redirect>
        </Router>
      )}
    </div>
  )
}

export default ViewProfile
