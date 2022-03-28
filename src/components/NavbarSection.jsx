import { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../index.css";
import Icons from "./Icons";
import { Menu, Dropdown, Button } from "antd";

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

  const menu = (
    <Menu className='mt-16 z-50' style={{ zIndex: "9999" }}>
      <Menu.Item key='profile' className='color-secendary-hover'>
        <Link rel='noopener noreferrer' to='/profile'>
          <div className='px-4 font-semibold'>Profile</div>
        </Link>
      </Menu.Item>
      <Menu.Item key='settings' className='color-secendary-hover'>
        <Link rel='noopener noreferrer' to='https://www.aliyun.com'>
          <div className='px-4 font-semibold'>Setttings</div>
        </Link>
      </Menu.Item>
      <Menu.Item key='logout' className='color-secendary-hover'>
        <div
          className='px-4 font-semibold'
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("User Details");
            navigator("/");
          }}
        >
          Sign Out
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Navbar
      id='navbar'
      className='w-screen px-20 py-2.5 color-primary'
      variant='dark'
      expand='lg'
      style={{ zIndex: "999" }}
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
          {JSON.parse(localStorage.getItem("token")) && (
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
          )}
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
              (activeClass === "/help") | (activeClass === "/help")
                ? `text-secendary`
                : `text-white`
            } font-semibold text-md my-auto mx-3 cursor-pointer`}
          >
            Help
          </p>
        </Nav>
        <Nav.Link className='pl-20 text-md text-white'>
          {JSON.parse(localStorage.getItem("User Details"))?.type ? (
            <Dropdown overlay={menu} placement='bottomRight' arrow>
              <div>
                {JSON.parse(localStorage.getItem("User Details"))?.type ===
                "teacher" ? (
                  <Icons.Teacher className='w-6' />
                ) : (
                  <Icons.Grafuation className='w-6' />
                )}
              </div>
            </Dropdown>
          ) : (
            <div className='flex justify-between items-center'>
              <p
                className={`${
                  activeClass === "/signin" ? `text-secendary` : `text-white`
                } font-semibold text-md my-auto mx-3 cursor-pointer`}
                onClick={() => {
                  setActiveClass("/signin");
                  navigator("/signin");
                }}
              >
                Sign In
              </p>
              <p
                className={`${
                  activeClass === "/signup" ? `text-secendary` : `text-white`
                } font-semibold text-md my-auto mx-3 cursor-pointer`}
                onClick={() => {
                  setActiveClass("/signup");
                  navigator("/signup");
                }}
              >
                Sign Up
              </p>
            </div>
          )}
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarSection;
