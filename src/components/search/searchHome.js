import { Container, Typography } from "@material-ui/core"
import axios from "axios"
import { Card, Button, Form, Modal } from "react-bootstrap"
import React, { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { useLocation, useParams } from "react-router"
import { BrowserRouter as Router } from "react-router-dom"
import Header from "../Feeds/header"
import { Link } from "react-router-dom"

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

function FilterSearchModal(props) {
  const handleChange = (e) => {
    console.log(e.target)
    const name = e.target.name
    const value = e.target.value
    props.params({ ...props.data, [name]: value })
    console.log(props.data)
  }
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Filters </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={12} md={8}>
              <Typography gutterBottom variant="inherit">
                Filter By City
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={8}>
              <Col>
                <Form.Control
                  placeholder="City"
                  name="city"
                  value={props.data.city}
                  onChange={handleChange}
                />
              </Col>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={8}>
              <Typography variant="inherit">Filter By Age</Typography>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={8}>
              <Col>
                <Form.Control
                  as="select"
                  onChange={handleChange}
                  name="age"
                  value={props.data.age}
                >
                  <option>Less than 18</option>
                  <option>Above 18 Less than 29</option>
                  <option>Above 30 less than 39</option>
                  <option>Above 40 less than 49</option>
                  <option>Above 50</option>
                </Form.Control>
              </Col>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={props.onSearch}>Search</Button>
      </Modal.Footer>
    </Modal>
  )
}

function SearchHome(props) {
  const data = useParams()
  const [searchParams, setSearchParams] = useState({
    city: "",
    age: "",
    name: data.query,
  })
  console.log(data)

  const [person, setPerson] = useState({
    name: "",
    pic_url: "",
    status: "",
  })

  const [listUsers, setlistUsers] = useState([])


  const [modalShow, setModalShow] = useState(false)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setSearchParams({ ...searchParams, [name]: value })
    console.log(searchParams)
  }

  useEffect(() => {
    fetchUser()
    searchUser()
  }, [])

  function fetchUser() {
    axios
      .get("http://localhost:5000/getprofile", {
        params: {
          user: data.userid,
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
  function searchUser() {
    axios
      .get("http://localhost:5000/searchUserByName", {
        params: {
          name: searchParams.name,
          city: searchParams.city,
          age: searchParams.age,
        },
      })
      .then(function (response) {
        console.log(response)
        if (response.status === 200) {
          setlistUsers(response.data)
          console.log(listUsers)
          setModalShow(false)

          // console.log(resp)
        } else if (response.data.status === "Failed") {
        }
      })
      .catch(function (error) {
        setlistUsers([])
      })
  }
  async function searchUserByAge() {
    await axios
      .get("http://localhost:5000/searchUserByAge", {
        params: {
          name: searchParams.name,
          // city: searchParams.city,
          age: searchParams.age,
        },
      })
      .then(function (response) {
        if (response.status === 200) {
            console.log(response.data);
            // setlist(value)
          setlistUsers(response.data)
          console.log(listUsers)
          // console.log(resp)
        } else if (response.data.status === "Failed") {
        }
      })
      .catch(function (error) {
        setlistUsers([])
      })
  }

  async function searchUserByCity() {
    await axios
      .get("http://localhost:5000/searchUserByCity", {
        params: {
          name: searchParams.name,
          city: searchParams.city,
          // age: searchParams.age,
        },
      })
      .then(function (response) {
        if (response.status === 200) {
            console.log(response.data);
            // setlist(value)
          setlistUsers(response.data)
          console.log(listUsers)
          // console.log(resp)
        } else if (response.data.status === "Failed") {
        }
      })
      .catch(function (error) {
        setlistUsers([])
      })
  }

  
  const location = useLocation()

  return (
    <div>
      <Header
        user_id={data.userid}
        name={person.name}
        picurl={person.pic_url}
        hideSearch={true}
      ></Header>
      <Typography gutterBottom> </Typography>
      {/* <button className="btn btn-dark">{data.query}</button> */}
      <div className="container-lg">
        <div className="row">
          <div className="col-lg-12">
            <div className="input-group mb-3">
              <input
                style={{ marginTop: "20px" }}
                type="text"
                className="form-control"
                placeholder="Search"
                name="name"
                value={searchParams.name}
                onChange={handleChange}
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <Router forceRefresh={true}>
                <Link
                  to={{
                    pathname:
                      "/search/" + data.userid + "/" + searchParams.name,
                    state: { from: props.location, user: true },
                  }}
                >
                  <button
                    className="btn btn-secondary"
                    type="button"
                    id="button-addon2"
                    style={{ marginLeft: "20px", marginTop: "20px" }}
                  >
                    Search User
                  </button>
                </Link>
              </Router>
            </div>
            <div className="row">
              <div className="col-md-12 text-center">
                <Button variant="secondary" onClick={() => setModalShow(true)}>
                  Filter by age & city
                </Button>

                <FilterSearchModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  params={setSearchParams}
                  data={searchParams}
                  onSearch={() => {    
                      setModalShow(false)
                      if(searchParams.city!=''){
                        searchUserByCity()
                      }               
                      searchUserByAge()
                  }}
                />
                <Typography gutterBottom></Typography>
                <Row>
                  {listUsers.length > 0 ? (
                    listUsers.map((user) => (
                      <Col md={4} style={{ padding: "10px" }}>
                        <Card
                          style={{
                            width: "18rem",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {/* <Card.Img variant="top" src={user.user_pic_url.length>0? user.user_pic_url : ""} /> */}
                          <Card.Header as="h4">{user.u_name}</Card.Header>
                          <Card.Body>
                            <Card.Title>
                              {user.u_bio.length > 0
                                ? decrypt(user.u_bio)
                                : "None"}
                            </Card.Title>
                            <Card.Text>
                              {user.u_hobby ? decrypt(user.u_hobby) : " "}
                            </Card.Text>
                            <Card.Text>{decrypt(user.u_interests)}</Card.Text>
                            <Button variant="secondary">View Profile</Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <Col md={12}>
                      <Typography variant="body2" style={{ padding: "20px" }}>
                        No User Found
                      </Typography>
                    </Col>
                  )}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchHome
