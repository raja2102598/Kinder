import {
  Navbar,
  Nav,
  Form,
  Button,
  NavDropdown,
  FormControl,
} from "react-bootstrap"
import { Link } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Avatar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { deepOrange, deepPurple } from "@material-ui/core/colors"
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}))

function Header(props) {
  const [searchQuery,setSearchQuery]=useState("")

  const handleChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    // console.log(person);
  }

  const classes = useStyles()
  return (
    <>
      <Router forceRefresh={true}>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Kinder</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>Messages</Nav.Link>
            <Nav.Link>Friends</Nav.Link>
          </Nav>
          <Form inline style={{ padding: "6px" }}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" value={searchQuery} onChange={handleChange} required/>
            <Link to={{
              pathname:"/search/"+searchQuery,
              state:{from: props.location, user:true}
            }}>
            <Button variant="outline-light">Search</Button>
            </Link>
          </Form>
          <Link
            to={{
              pathname: "/profile/" + props.user_id,
              state: { from: props.location, user: true },
            }}
          >
            {props.picurl.length > 0 ? (
              <Button variant="outline-dark">
                <Avatar
                  alt=""
                  src={props.picurl}
                />
              </Button>
            ) : (
              <Avatar className={classes.orange}>{props.name[0]} </Avatar>
            )}
          </Link>
        </Navbar>
      </Router>
    </>
  )
}

export default Header
