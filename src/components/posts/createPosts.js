import React, { useState, useEffect } from "react"
import { Link, useParams, Redirect, useLocation } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Grid, Button, Typography } from "@material-ui/core"
import { storage } from "../../helpers/firebase"
import TextField from "@material-ui/core/TextField"

import { makeStyles } from "@material-ui/core/styles"
import Header from "../Feeds/header"
import { Col, Form, Row, Spinner } from "react-bootstrap"
const axios = require("axios")
const Flag = (props) => {
  return (
    <Typography component="h2" variant="body1" color="primary">
      {props.text}
    </Typography>
  )
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

function CreatePosts(props) {
  const { userid } = useParams()
  console.log(userid)

  const [file, setFile] = useState(null)
  const [url, setURL] = useState("")
  const [savedMsg, setsavedMsg] = useState(false)
  const [isClick, setisClick] = useState(false)
  const [isUploading, setisUploading] = useState("")

  const [HideBtn, setHideBtn] = useState(false)

  const [caption, setcaption] = useState("")

  const [Post, setPost] = useState({
    name: "",
    pic_url: "",
    user_id: userid,
  })
  // console.log(savePost)
  // console.log(Post)
  const showRes = () => {
    setsavedMsg(true)
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setHideBtn(false)
  }
  function saveData() {
    if (true) {
      axios
        .post("http://localhost:5000/sendPosts", {
          params: {
            photo_url: url,
            caption: caption,
            user_id: userid,
            upload_time: Date.now(),
            like_status: 0,
          },
        })
        .then(function (response) {
          console.log(response)
          if (response.data.status === "Success") {
          } else if (response.data.status === "Failed") {
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(Post)
    if (caption != "" && url != "") {
      saveData()
      showRes()
    }
  }
  const handleUpload = (e) => {
    const uploadTask = storage.ref(`/posts/${file.name}`).put(file)
    setisUploading(true)
    setHideBtn(true)
    setisClick(true)
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("posts")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(null)
          setURL(url)
          setisUploading(false)
        })
    })
  }

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
          var resp = response.data
          setPost({
            name: resp.name,
            status: resp.status,
            pic_url: resp.user_pic_url,
          })
          console.log(Post)
        } else if (response.data.status === "Failed") {
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
      {location.state?.user ? (
        <div>
          <Header
            user_id={userid}
            name={Post.name}
            picurl={Post.pic_url}
          ></Header>
          <h1 class="display-4 text-center">Create Post</h1>
          <Grid
            container
            alignContent="center"
            alignItems="center"
            justify="center"
            style={{ marginLeft: "10%", marginTop: "5%" }}
          >
            <Grid item sm={12} xs={12}>
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                  <div className="row">
                    <div className="col-4">
                      <Form.Label>Caption</Form.Label>
                    </div>
                    <div className="col-4">
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Enter Something"
                        required
                        value={caption}
                        onChange={(e) => setcaption(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </Form.Group>
                <Form.Group as={Row}>
                  <div className="row">
                    <div className="col-4">
                      <Form.Label>Photo</Form.Label>
                    </div>
                    <div className="col-4">
                      <div class="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          onChange={handleFileChange}
                          id="inputFile"
                        />
                        <label class="custom-file-label" for="inputFile">
                          {file == null ? "Choose file" : file.name}
                        </label>
                      </div>
                    </div>
                    <div className="col-4 p-1">
                      <button
                        disabled={!file}
                        onClick={handleUpload}
                        // style={{ visibility: "hidden" }}
                        hidden={HideBtn}
                      >
                        Upload
                      </button>
                      {isClick ? (
                        isUploading ? (
                          <Spinner animation="border" />
                        ) : (
                          <Flag text="Successfully Uploaded"></Flag>
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Form.Group>
                <div className="row justify-content-center mt-5 pt-2">
                  <div className="col-5">
                    <button type="submit" className="btn btn-outline-dark">
                      Post
                    </button>
                    {savedMsg ? <Flag text="Posted Successfully"></Flag> : ""}
                  </div>
                </div>
              </Form>
            </Grid>
          </Grid>
        </div>
      ) : (
        <Router forceRefresh={true}>
          <Redirect to="/login"></Redirect>
        </Router>
      )}
    </div>
  )
}

export default CreatePosts
