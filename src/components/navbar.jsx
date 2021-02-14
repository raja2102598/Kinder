import { Nav } from "react-bootstrap"

function Navbar() {
  const handleSelect = (eventKey) => alert(`selected ${eventKey}`)

  return (
    <Nav justify variant="tabs" defaultActiveKey="/home" className="bg-light">
      <Nav.Item>
        <Nav.Link href="/home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Getting Started</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Profile</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-3">Matches</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-3">Messages</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default Navbar
