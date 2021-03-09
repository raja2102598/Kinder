import React, { useState, useEffect } from "react"
import { Link, useParams, Redirect, useLocation } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Grid, Button } from "@material-ui/core"
import { storage } from "../../helpers/firebase"


import { makeStyles } from "@material-ui/core/styles"
import Header from "../Feeds/header"
import { Col, Form, Row } from "react-bootstrap"
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

function EditProfile(props) {
  const params = useParams()
  const [file, setFile] = useState(null)
  const [url, setURL] = useState("")
  var userid = params.userid
  console.log(userid)

  const [person, setPerson] = useState({
    name: "",
    bio: "",
    city: "",
    dob: "",
    email: "",
    gender: "",
    hobby: "",
    interests: "",
    userpic:  "",
    status: "",
    user_id: userid,
  })
  const [savePerson, setsavePerson] = useState({
    name: "",
    bio: "",
    city: "",
    dob: "",
    email: "",
    gender: "",
    hobby: "",
    interests: "",
    user_id: userid,
  })
  console.log(savePerson)
  console.log(person)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setsavePerson({ ...savePerson, [name]: value })
    setPerson({ ...person, [name]: value })
    console.log(savePerson)
    console.log(person)
  }
  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }
  function saveData() {
    if (true) {
      axios
        .post("http://localhost:5000/updateProfile", {
          params: {
            data: person,
            user_id: savePerson.user_id,
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
    // console.log(person)
    saveData()
  }
  const handleUpload = (e) => {
    const uploadTask = storage.ref(`/images/${file.name}`).put(file)
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(null)
          setURL(url)
          setPerson({...person,["userpic"]:url})
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
          user: params.userid,
        },
      })
      .then(function (response) {
        if (response.data.status === "Success") {
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
          console.log(person)
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
      {location.state?.user ? (
        <div>
          <Header user_id={params.userid} name={person.name}></Header>
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
                  <Form.Label column sm={2}>
                    Profile Picture
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control type="file" onChange={handleFileChange} />
                    <img
                      src={url}
                      alt=""
                      style={{
                        borderRadius: "50%",
                        marginRight: "10%",
                        margin: "10%",
                      }}
                      height="150"
                      width="150"
                    />
                    <button disabled={!file} onClick={handleUpload}>
                      Upload
                    </button>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Name
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      id="name"
                      name="name"
                      value={person.name}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Bio
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control
                      type="TextField"
                      placeholder="bio"
                      id="bio"
                      name="bio"
                      value={person.bio}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    City
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control
                      type="text"
                      id="city"
                      name="city"
                      placeholder="City"
                      value={person.city}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    DOB
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control
                      type="Date"
                      id="dob"
                      name="dob"
                      value={person.dob}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Email
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control
                      type="email"
                      placeholder="email"
                      id="email"
                      name="email"
                      value={person.email}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Gender
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Check
                      inline
                      type="radio"
                      label="Male"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Female"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Hobby
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control
                      type="TextField"
                      placeholder="hobby"
                      id="hobby"
                      name="hobby"
                      value={person.hobby}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Interests
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control
                      type="TextField"
                      id="interests"
                      name="interests"
                      placeholder="interests"
                      value={person.interests}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit" variant="outlined">
                      Save
                    </Button>
                  </Col>
                </Form.Group>
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

export default EditProfile
