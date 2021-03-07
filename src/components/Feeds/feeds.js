import React, { useState, useEffect } from "react"
import Header from "./header"
import { Container, CssBaseline, Typography } from "@material-ui/core"
import { Redirect, useParams } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import Posts from "./posts"

const axios = require("axios")

function Feeds() {
  const { userid } = useParams()
  const [isUser, setIsUser] = useState(true)
  const [person, setPerson] = useState({
    name: "",
    status: "",
  })
  useEffect(() => {
    fetchUser()
  }, [])
  function fetchUser() {
    axios
      .get("http://localhost:5000/getprofile", {
        params: {
          user: userid,
        },
      })
      .then(function (response) {
        if (response.data.status === "Success") {
          setIsUser(true)
          var resp = response.data
          setPerson({
            name: resp.name,
            status: resp.status,
          })
        } else if (response.data.status === "Failed") {
          setIsUser(false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
      {isUser ? (
        <div>
          <CssBaseline />
          <Header user_id={userid} name={person.name}></Header>
          <Typography gutterBottom variant="h1">
            
          </Typography>
          
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
          <h1>Hello</h1>
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
