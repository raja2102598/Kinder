import { Navbar, Nav, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"

function Header(props) {
  console.log(props)
  return (
    <div>
      <Router forceRefresh={true}>
        <Navbar bg="secondary" expand="lg" varient="dark">
          <Navbar.Brand href="#home">Kinder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Form inline>
              <Link to={"/profile/" + props.user_id}>
                <Button variant="outline-light" style={{ marginRight: "10px" }}>
                  Profile
                </Button>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </Router>
    </div>
  )
}

export default Header
