import { Navbar, Nav, Form } from "react-bootstrap"
import Login from "./Login"
import Signup from "./signup"

function Header() {
  return (
    <div>
      <Navbar bg="secondary" expand="lg" varient="dark">
        <Navbar.Brand href="#home">Kinder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="#link">Link</Nav.Link>
            <Nav.Link href="#home">Home</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown"> */}
            {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
            {/* <NavDropdown.Divider /> */}
            {/* <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            {/* </NavDropdown> */}
          </Nav>
          <Form inline>
            <Login></Login>
            <Signup></Signup>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
