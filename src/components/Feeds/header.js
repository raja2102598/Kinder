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
import { useState } from "react"

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
  const [searchQuery, setSearchQuery] = useState("")

  const handleChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    // console.log(person);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const classes = useStyles()
  return (
    <>
      <Router forceRefresh={true}>
        <Navbar bg="dark" variant="dark">
          <Link
            to={{
              pathname: "/feeds/" + props.user_id,
              state: { from: props.location, user: true },
            }}
          >
            <Navbar.Brand>Kinder</Navbar.Brand>
          </Link>
          <Nav className="mr-auto">
            <Nav.Link>
              <Link
                to={{
                  pathname: "/feeds/" + props.user_id,
                  state: { from: props.location, user: true },
                }}
                style={{ color: "#96989D", textDecoration: "none" }}
              >
                Feeds
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to={{
                  pathname: "/createPost/" + props.user_id,
                  state: { from: props.location, user: true },
                }}
                style={{ color: "#96989D", textDecoration: "none" }}
              >
                Create Post
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link
                to={{
                  pathname: "/login/",
                  state: { from: props.location, user: false },
                }}
                style={{ color: "#96989D", textDecoration: "none" }}
              >
                Logout
              </Link>
            </Nav.Link>
          </Nav>
          {!props.hideSearch ? (
            <Form inline style={{ padding: "6px" }} onSubmit={handleSubmit}>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                value={searchQuery}
                onChange={handleChange}
                required
              />
              <Link
                to={{
                  pathname: "/search/" + props.user_id + "/" + searchQuery,
                  state: { from: props.location, user: true },
                }}
              >
                <Button variant="outline-light">Search</Button>
              </Link>
            </Form>
          ) : (
            ""
          )}
          <Link
            to={{
              pathname: "/profile/" + props.user_id,
              state: { from: props.location, user: true },
            }}
            style={{ textDecoration: "none" }}
          >
            {props.picurl.length > 0 ? (
              <Button variant="outline-dark">
                <Avatar alt="" src={props.picurl} />
              </Button>
            ) : (
              <Avatar className={classes.orange}>{props.name[0]}</Avatar>
            )}
          </Link>
        </Navbar>
      </Router>
    </>
  )
}

export default Header
