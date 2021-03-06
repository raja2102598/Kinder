import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
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

function Profile() {
  // var person = ""
  const { userid } = useParams()
  const [isUser, setIsUser] = useState(true)
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
          setIsUser(true)
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
          setIsUser(false)
          // return null
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div>
      {isUser ? (
        <div>
          <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
              {person.name}
            </Typography>
            <Typography component="h1" variant="h5">
              {person.bio}
            </Typography>
            <Typography component="h1" variant="h5">
              {person.city}
            </Typography>
            <Typography component="h1" variant="h5">
              {person.dob}
            </Typography>
            <Typography component="h1" variant="h5">
              {person.email}
            </Typography>
            <Typography component="h1" variant="h5">
              {person.gender}
            </Typography>
            <Typography component="h1" variant="h5">
              {person.hobby}
            </Typography>
            <Typography component="h1" variant="h5">
              {person.interests}
            </Typography>
          </Container>
        </div>
      ) : (
        <h1>User Not Found</h1>
      )}
    </div>
  )
}

export default Profile
