import { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../index.css";
import Icons from "./Icons";

function NavbarSection() {
  const [activeClass, setActiveClass] = useState("");
  const navigator = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActiveClass(location.pathname);
    console.log(activeClass);
  }, [location.pathname, activeClass]);

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
          <p
            className={`${
              activeClass === "/dashboard" ? `text-secendary` : `text-white`
            } font-semibold text-md my-auto mx-3 cursor-pointer`}
            onClick={() => {
              setActiveClass("/dashboard");
              navigator("/dashboard");
            }}
          >
            Dashboard
          </p>
          <p
            className={`${
              activeClass === "/courses" ? `text-secendary` : `text-white`
            } font-semibold text-md my-auto mx-3 cursor-pointer`}
            onClick={() => {
              setActiveClass("/courses");
              navigator("/signup");
            }}
          >
            Courses
          </p>
        </Nav>
        <Nav.Link className='pl-20 text-md text-white'>
          <Icons.Grafuation className='w-6 ' />
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarSection;
