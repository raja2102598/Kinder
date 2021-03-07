import React, { useState, useEffect } from "react"
import Header from "./header"
import { Container, CssBaseline, Typography } from "@material-ui/core"
import { Redirect, useLocation, useParams } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import Posts from "./posts"
import Stories from "./stories"

const axios = require("axios")

function Feeds() {
  const { userid } = useParams()
  const [person, setPerson] = useState({
    name: "",
    status: "",
  })
  const location = useLocation()
  useEffect(() => {
    fetchUser()
  }, [])
  function fetchPosts() {
    axios
      .get("http://localhost:5000/", {
        params: {
          user: userid,
        },
      })
      .then(function (response) {
        if (response.data.status === "Success") {
          var resp = response.data
          setPerson({
            name: resp.name,
            status: resp.status,
          })
        } else if (response.data.status === "Failed") {
          setPerson({
            name: "U",
            status: "Failed",
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  function fetchUser() {
    axios
      .get("http://localhost:5000/getprofile", {
        params: {
          user: userid,
        },
      })
      .then(function (response) {
        if (response.data.status === "Success") {
          var resp = response.data
          setPerson({
            name: resp.name,
            status: resp.status,
          })
        } else if (response.data.status === "Failed") {
          setPerson({
            name: "U",
            status: "Failed",
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
      {location.state?.user ? (
        <div>
          <CssBaseline />
          <Header user_id={userid} name={person.name}></Header>
          <Typography gutterBottom variant="h1"></Typography>
          <Stories></Stories>
          <Posts
            avatarurl=""
            nickname="raja"
            imageurl="https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg"
            imageCaption="hello"
          ></Posts>
          <Posts
            avatarurl=""
            nickname="raja"
            imageurl="https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg"
            imageCaption="hello"
          ></Posts>
        </div>
      ) : (
        <Router forceRefresh={true}>
          <Redirect to="/login"></Redirect>
        </Router>
      )}
    </>
  )
}

export default Feeds
