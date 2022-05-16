import { Dropdown, Menu } from "antd";
import { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../index.css";
import Icons from "./Icons";
import logo from "../assets/Images/ses_logo.png";

function NavbarSection() {
  const [activeClass, setActiveClass] = useState("");
  const [userData, setUserData] = useState({});

  const navigator = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActiveClass(location.pathname);
    setUserData(JSON.parse(localStorage.getItem("User Details")));
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
        <Link rel='noopener noreferrer' to='/'>
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
      <div className='w-full md:w-4/12 flex justify-between items-center'>
        <Navbar.Brand className='font-medium text-xl text-white' href='#'>
          <img className='w-8' src={logo} alt='' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
      </div>
      <Navbar.Collapse
        id='navbarScroll'
        className='md:w-9/12 md:flex justify-between items-center'
      >
        <div>
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
                (activeClass ===
                  `/progresses/${localStorage.getItem("student")}`)
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
            {userData?.type === "teacher" ? (
              <a
                className={`${
                  (activeClass === "/create_class") |
                  (activeClass === "/create_class")
                    ? `text-secendary`
                    : `text-white`
                } font-semibold text-md my-auto mx-3 cursor-pointer`}
                href='http://localhost:3001/'
                target='_blank'
              >
                Create Class
              </a>
            ) : (
              <p
                className={`${
                  (activeClass === "/payment") |
                  (activeClass ===
                    `/progresses/${localStorage.getItem("student")}`)
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
            )}

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
        </div>
        <Nav.Link className='pl-20 text-md text-white'>
          {JSON.parse(localStorage.getItem("User Details"))?.type ? (
            <Dropdown
              overlay={menu}
              placement='bottomRight'
              arrow
              trigger='[click]'
            >
              <div>
                {JSON.parse(localStorage.getItem("User Details"))?.type ===
                "teacher" ? (
                  <div className='flex items-start'>
                    <Icons.Teacher className='w-6' />{" "}
                    <p className='mt-1.5 mb-0 ml-2 font-light'>
                      {
                        JSON.parse(localStorage.getItem("User Details"))
                          ?.first_name
                      }{" "}
                      {
                        JSON.parse(localStorage.getItem("User Details"))
                          ?.last_name
                      }
                    </p>
                  </div>
                ) : (
                  <div className='flex items-start'>
                    <Icons.Grafuation className='w-6' />
                    <p className='mt-1.5 mb-0 ml-2 font-light'>
                      {
                        JSON.parse(localStorage.getItem("User Details"))
                          ?.first_name
                      }{" "}
                      {
                        JSON.parse(localStorage.getItem("User Details"))
                          ?.last_name
                      }
                    </p>
                  </div>
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
            </div>
          )}
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarSection;
