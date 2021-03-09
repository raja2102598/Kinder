import { Navbar, Nav, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"

function Header() {
  return (
    <div>
      <Router forceRefresh={true}>
        <Navbar bg="secondary" expand="lg" varient="dark">
          <Navbar.Brand href="#home">Kinder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Form inline>
              <Link
                to={{
                  pathname: "/signup",
                  state: {
                    hello: true,
                  },
                }}
              >
                <Button
                  variant="outline-light"
                  style={{ marginRight: "10px" }}
                  // onClick={() => {
                  //   // console.log("hello")
                  //   // history.push("/signup")
                  // }}
                >
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline-light"
                  // onClick={() => {
                  //   // console.log("hello")
                  //   // history.push("/login")
                  //   // history.push({
                  //   //   pathname: "/login",
                  //   //   customNameData: "hello",
                  //   // })
                  // }}
                >
                  Login
                </Button>
              </Link>
              {/*             
            <Login></Login>
             <Signup></Signup> */}
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </Router>
    </div>
  )
}

export default Header
