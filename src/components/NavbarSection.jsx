import { Nav, Navbar } from "react-bootstrap";
import "../index.css";
import Icons from "./Icons";

function NavbarSection() {
  return (
    <Navbar
      className='w-screen px-20 py-2.5 color-primary fixed top-0 z-50'
      variant='dark'
      expand='lg'
    >
      <Navbar.Brand className='font-medium text-xl text-white' href='#'>
        S.E.S
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='navbarScroll' />
      <Navbar.Collapse id='navbarScroll'>
        <Nav
          className='ml-auto my-2 pl-16 my-lg-0'
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Link className='font-semibold text-md text-white'>
            Dashboard
          </Nav.Link>
          <Nav.Link className='font-semibold text-md text-white'>
            Courses
          </Nav.Link>
        </Nav>
        <Nav.Link className='pl-20 text-md text-white'>
          <Icons.Grafuation className='w-6 ' />
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarSection;
