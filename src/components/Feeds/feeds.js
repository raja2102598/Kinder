import React, { useState, useEffect } from "react"
import Header from "./header"
import { Container, CssBaseline, Typography } from "@material-ui/core"
import { Redirect, useLocation, useParams } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import Posts from "./posts"
import Stories from "./stories"
import timeDifference from "../../helpers/timeDifference"

const axios = require("axios")

function Feeds() {
  const { userid } = useParams()
  const [person, setPerson] = useState({
    name: "",
    pic_url: "",
    status: "",
  })
  const [posts, setposts] = useState([])
  const location = useLocation()
  console.log(location)
  useEffect(() => {
    fetchUser()
    fetchPosts()
  }, [])
  function fetchPosts() {
    axios
      .get("http://localhost:5000/getPosts")
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

  function fetchUser() {
    axios
      .get("http://localhost:5000/getprofile", {
        params: {
          user: userid,
        },
      })
      .then(function (response) {
        console.log(response)
        if (response.data.status === "Success") {
          var resp = response.data
          setPerson({
            name: resp.name,
            pic_url: resp.user_pic_url,
            status: resp.status,
          })
          console.log(person)
        } else if (response.data.status === "Failed") {
          setPerson({
            name: "U",
            status: "Failed",
            pic_url: "",
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
          <Header
            user_id={userid}
            name={person.name}
            picurl={person.pic_url}
          ></Header>
          <Typography gutterBottom variant="h1"></Typography>
          <Stories></Stories>

          {posts.length > 0 ? (
            posts.reverse().map((post) => {
              return (
                <Posts
                  avatarurl={post.user_pic_url}
                  nickname={post.u_name}
                  imageurl={post.photo_url}
                  imageCaption={post.caption}
                  time={timeDifference(Date.now(), new Date(post.upload_time))}
                />
              )
            })
          ) : (
            <Posts
              avatarurl="https://picsum.photos/150/150"
              nickname="Raja J"
              imageurl="https://picsum.photos/500/500"
              imageCaption="hello world"
            ></Posts>
          )}
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
