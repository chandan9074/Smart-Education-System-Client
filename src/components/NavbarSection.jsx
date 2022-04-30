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
  }, [location.pathname, activeClass]);

  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-60px";
    }
    prevScrollpos = currentScrollPos;
  };

  return (
    <Navbar
      id='navbar'
      className='w-screen px-20 py-2.5 color-primary'
      variant='dark'
      expand='lg'
      style={{ zIndex: "9999" }}
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
              (activeClass === "/check-progresses") |
              (activeClass === `/progresses/${localStorage.getItem("student")}`)
                ? `text-secendary`
                : `text-white`
            } font-semibold text-md my-auto mx-3 cursor-pointer`}
            onClick={() => {
              setActiveClass("/check-progresses");
              navigator("/check-progresses");
            }}
          >
            Progrecesses
          </p>
          <p
            className={`${
              (activeClass === "/payment") |
              (activeClass === `/progresses/${localStorage.getItem("student")}`)
                ? `text-secendary`
                : `text-white`
            } font-semibold text-md my-auto mx-3 cursor-pointer`}
            onClick={() => {
              setActiveClass("/payment");
              navigator("/payment");
            }}
          >
            Payment
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
