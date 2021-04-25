import { useState, Fragment } from "react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import { APP_NAME } from "../config";
import {
  // Collapse,
  // Navbar,
  // NavbarToggler,
  // NavbarBrand,
  // Nav,
  // NavItem,
  // NavLink,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";
import { signout, isAuth } from "../actions/auth";
import Modal from "./modals/modal";
import Login from "./modals/SigninModal";
import Register from "./modals/RegisterModal";
import ".././node_modules/nprogress/nprogress.css";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const BsNavLink = props => {
  const { title, href } = props
  return (
    <Link href={href}>
      <a className="nav-link port-navbar-link">
        {title}
      </a>
    </Link>
  )
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    
    <Fragment>
      <Navbar className="port-navbar port-default absolute" color="transparent" dark expand="md" >
        <div className="font-weight-bold port-navbar-item" style={{ cursor: "pointer" }}>
          <Modal />
        </div>
        <NavbarBrand className="font-weight-bold port-navbar-item" href="/"><Modal /></NavbarBrand>
        <NavLink className="port-navbar-brand">
          <BsNavLink title="Home" href="/"/>
        </NavLink>
        <NavLink className="port-navbar-brand">
          <BsNavLink title="Learners Books" href="/learners"/>
        </NavLink> 
        <NavLink className="port-navbar-brand">
          <BsNavLink title="Teacher Guides" href="/guides"/>
        </NavLink> 
        <NavLink className="port-navbar-brand">
          <BsNavLink title="All Syllabuses" href="/syllabus"/>
        </NavLink> 
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav>
          {!isAuth() && (
              <React.Fragment>
                <NavItem className="port-navbar-item">
                  <NavLink>
                    <Login />
                  </NavLink>
                </NavItem>           

                <NavItem className="port-navbar-item">
                  <NavLink>
                    <Register />
                  </NavLink>
                </NavItem>
              </React.Fragment>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem className="port-navbar-item">
                <Link href="/user">
                  <NavLink
                  >
                    My Dashboard
                  </NavLink>
                </Link>
              </NavItem>
            )} 
            
          </Nav>
          <Nav>

            {isAuth() && isAuth().role === 0 && (
              <NavItem className="port-navbar-item">
                <Link href="/user">
                  <NavLink
                  >
                    My Dashboard
                  </NavLink>
                </Link>
              </NavItem>
            )}
          {isAuth() && isAuth().role === 1 && (
              <NavItem className="port-navbar-link">
              <Link href="/admin">
                <NavLink
                  >
                    Admin Dashboard
                </NavLink>
                </Link>
              </NavItem>
            )}
            {isAuth() && (
              <Fragment>
                <NavItem className="port-navbar-link">
                   {/* push and replace perform the same function  */}
                  <NavLink
                    onClick={() => signout(() => Router.replace("/"))}
                  >
                      Signout
                  </NavLink>
                </NavItem>
                <NavItem className="port-navbar-link">
                   {/* push and replace perform the same function  */}

                  <Link href="/profile">
                    <NavLink>
                      My Profile
                    </NavLink>
                  </Link>
                </NavItem>
              </Fragment>
            )} 
             
      </Nav>
      </Collapse>
     </Navbar> 
{/*       

======>START MEGA MENU 1 <=============
      <div className="main-navigation-bar">
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li className="dropdown">
              <a href="#">Services</a>
              <ul className="menu-area">
                <ul>
                  <h5>Our Company</h5>
                  <img src="./static/images/ocean.jpg" alt="ocean"/>
                </ul>
                <ul>
                  <h5>Graphics Design</h5>
                  <li><a href="#">Logo Design</a></li>
                  <li><a href="#">Brochure Design</a></li>
                  <li><a href="#">Template Design</a></li>
                  <li><a href="#">Book Design</a></li>
                  <li><a href="#">Card Design</a></li>
                </ul>
                <ul>
                  <h5>Web Development</h5>
                  <li><a href="#">Html Website</a></li>
                  <li><a href="#">Joomla Website</a></li>
                  <li><a href="#">Template Website</a></li>
                  <li><a href="#">Wordpress Website</a></li>
                  <li><a href="#">Drupal Website</a></li>
                </ul>
                <ul>
                  <h5>Photography</h5>
                  <li><a href="#">Fashion Photography</a></li>
                  <li><a href="#">Portrait Photography</a></li>
                  <li><a href="#">Fine Art Photography</a></li>
                  <li><a href="#">Sports Photography</a></li>
                  <li><a href="#">Landscape Photography</a></li>
                  <li><a href="#">Aerial Photography</a></li>
                </ul>
              </ul>
            </li>
            <li><a href="#">Portfolio</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div> 
  ======================>END MEGA MENU 1 <==========================
      */}
  {/* ======================>STARTS MEGA MENU 2 - BOOTSTRAP <========================== */}
  {/* <div className="banner-area">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
            <a className="navbar-brand" href="#">Tech Technologies</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" 
            aria-controls="navbars" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className="collapse navbar-collapse justify-content-center" id="navbar">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Services</a>
                </li>
                <li className="nav-item dropdown menu-area">
                  <a className="nav-link dropdown-toggle" href="#" id="mega-one"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Web sites
                  </a>
                  <div className="dropdown-menu mega-area" aria-labelledby="mega-one">
                   <div className="row">
                     <div className="col-sm-6 col-lg-3">
                       <h5>Web Design</h5>
                       <a href="#" className="dropdown-item">HTML Templates</a>
                       <a href="#" className="dropdown-item">Wordpress Templates</a>
                       <a href="#" className="dropdown-item">Joomla Templates</a>
                       <a href="#" className="dropdown-item">Blogger Templates</a>
                       <a href="#" className="dropdown-item">wordpress Templates</a>
                     </div>
                     <div className="col-sm-6 col-lg-3">
                      <h5>Graph Design</h5>
                      <a href="#" className="dropdown-item">Logo Maker Templates</a>
                      <a href="#" className="dropdown-item">VFX Templates</a>
                      <a href="#" className="dropdown-item">Card Templates</a>
                      <a href="#" className="dropdown-item">Animation Templates</a>
                      <a href="#" className="dropdown-item">VFX Templates</a>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                      <h5>Bootstrap</h5>
                      <a href="#" className="dropdown-item">Heading Templates</a>
                      <a href="#" className="dropdown-item">Grid Templates</a>
                      <a href="#" className="dropdown-item">Card Templates</a>
                      <a href="#" className="dropdown-item">Navbar Templates</a>
                      <a href="#" className="dropdown-item">grid Templates</a>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                      <h5>Web Developer</h5>
                      <a href="#" className="dropdown-item">UI Developer</a>
                      <a href="#" className="dropdown-item">Android Developer</a>
                      <a href="#" className="dropdown-item">AWS Developer</a>
                      <a href="#" className="dropdown-item">IOS Developer</a>
                      <a href="#" className="dropdown-item">Android Developer</a>
                    </div>
                   </div>
                  </div>
                </li>
                <li className="nav-item dropdown menu-area">
                  <a className="nav-link dropdown-toggle" href="#" id="mega-two"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Portfolio
                  </a>
                  <div className="dropdown-menu mega-area" aria-labelledby="mega-two">
                   <div className="row">
                     <div className="col-sm-6 col-lg-3">
                       <h5>Web Design</h5>
                       <a href="#" className="dropdown-item">HTML Templates</a>
                       <a href="#" className="dropdown-item">Wordpress Templates</a>
                       <a href="#" className="dropdown-item">Joomla Templates</a>
                       <a href="#" className="dropdown-item">Blogger Templates</a> 
                     </div>
                     <div className="col-sm-6 col-lg-3">
                      <h5>Graph Design</h5>
                      <a href="#" className="dropdown-item">Logo Maker Templates</a>
                      <a href="#" className="dropdown-item">VFX Templates</a>
                      <a href="#" className="dropdown-item">Card Templates</a>
                      <a href="#" className="dropdown-item">Animation Templates</a>
                     </div>  
                    <div className="col-sm-6 col-lg-3">
                      <h5>Bootstrap</h5>
                      <a href="#" className="dropdown-item">Heading Templates</a>
                      <a href="#" className="dropdown-item">Grid Templates</a>
                      <a href="#" className="dropdown-item">Card Templates</a>
                      <a href="#" className="dropdown-item">Navbar Templates</a>
                      
                    </div>
                    <div className="col-sm-6 col-lg-3">
                      <h5>Web Developer</h5>
                      <a href="#" className="dropdown-item">UI Developer</a>
                      <a href="#" className="dropdown-item">Android Developer</a>
                      <a href="#" className="dropdown-item">AWS Developer</a>
                      <a href="#" className="dropdown-item">IOS Developer</a>
                     
                    </div>
                   </div>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Contact</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div> */}
    {/* ======================>END MEGA MENU 2 - BOOTSTRAP <========================== */}
    </Fragment>
                  
           
  )

};

export default Header;

