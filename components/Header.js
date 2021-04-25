import React, { Fragment, useState } from 'react';
import Link from "next/link";
import Router from "next/router";
import Typed from "react-typed";   
import {BiChevronDown} from "react-icons/bi"
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   NavbarText
// } from 'reactstrap';
import { signout, isAuth } from "../actions/auth";
import { Navbar } from "./header/Navbar"
import { NavItem } from "./header/NavItem"
import { SyllabusDropdownMenu } from "./header/SyllabusDropdownMenu"
import Login from "./modals/SigninModal";
import Register from "./modals/RegisterModal";

const ROLES = ["Ministry of Education and Human Resource Development"];
const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <header>
      <div className="navigation-top-wrapper">
        <div className="navigation-img__bg-image"></div>
        <div className="navigation-top-message">
          <div className="navigation-top-image"><img src="../static/images/emblem_1.png" alt="coat of arm" /></div>
          <div className="navigation-top-title left-border">
            <Typed
              loop
              strings={ROLES}
              typeSpeed={70}
              backSpeed={70}
              backDelay={1000}
              loopCount={0}
              showCursor
              className="header-typed"
              cursorChar="|"
            ></Typed>
          </div>
        </div>
      </div> 
      
      <nav className="main-navigation-wrapper">
        <ul className="main-navigation-main">
          <li className="main-navigation-link"><Link href="/"><a>Home</a></Link></li>
          <li className="main-navigation-link">
            <Link href="/syllabus">
              <a>Syllabuses  <BiChevronDown/></a>
            </Link>
            <ul className="main-navigation-link-guide">
                <li className="main-navigation-link-guide-item">
                <h4>Image</h4>
                  <Link href="/primary/guide/1/mathematics">
                    <a>Image should go in here!!</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <Link  href="/categories/[slug]" as="/categories/primary-syllabuses"><a><h4>Primary Syllabuses</h4></a></Link>
                  <Link  href="/syllabus/[slug]" as="/syllabus/primary-science-syllabus">
                    <a>Science Syllabus</a>
                  </Link>
                  <Link href="/syllabus/[slug]" as="/syllabus/primary-social-studies-syllabus">
                    <a>Social Studies Syllabus</a>
                  </Link>
                  <Link href="/syllabus/[slug]" as="/syllabus/primary-english-syllabus">
                    <a>English Syllabus</a>
                  </Link>
                  <Link href="/syllabus/[slug]" as="/syllabus/primary-health-education-syllabus">
                    <a>Health Education Syllabus</a>
                  </Link>
                  <Link href="/syllabus/[slug]" as="/syllabus/primary-mathematics-syllabus">
                    <a>Mathematics Syllabus</a>
                  </Link>
                  <Link href="/syllabus/[slug]" as="/syllabus/primary-arts-and-culture-syllabus">
                    <a>Arts and Culture Syllabus</a>
                  </Link>
                  <Link href="/syllabus/[slug]" as="/syllabus/primary-ict-syllabus">
                    <a>ICT Syllabus</a>
                  </Link>
                  <Link href="/syllabus/[slug]" as="/syllabus/primary-christian-life-syllabus">
                    <a>Christian Life Syllabus</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <Link  href="/categories/[slug]" as="/categories/junior-secondary-syllabuses"><a><h4>Secondary Syllabuses</h4></a></Link>
                  <Link href="/syllabus/[slug]" as="/syllabus/junior-secondary-science-syllabus">
                    <a>Science Syllabus</a>
                  </Link>
                  <Link href="/syllabus/[slug]" as="/syllabus/junior-secondary-ce-syllabus">
                    <a>Christian Education Syllabus</a>
                  </Link>
                  <Link href="/syllabus/[slug]" as="/syllabus/junior-secondary-pe-syllabus">
                    <a>Physcical Education Syllabus</a>
                  </Link>
                  <Link href="/syllabus/[slug]" as="/syllabus/junior-secondary-health-education-syllabus">
                    <a>Health Education Syllabus</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <Link  href="/categories/[slug]" as="/categories/junior-secondary-syllabuses"><a><h4>Senior Secondary Syllabuses</h4></a></Link>
                 
                  Contents will be made available soon!
                </li>
                <li className="main-navigation-link-guide-item">
                  <Link  href="/categories/[slug]" as="/categories/junior-secondary-syllabuses"><a><h4>TVET Syllabuses</h4></a></Link>
                  To be availabe soon!
                </li>
                
            </ul>
          </li>
          <li className="main-navigation-link">
            <Link href="/guides">
              <a>Teachers Guides <BiChevronDown/></a>
            </Link>
            
            <ul className="main-navigation-link-guide">
                <li className="main-navigation-link-guide-item">
                <h4>Year 1</h4>
                  <Link href="/primary/guide/1/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                <h4>Year 2</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <h4>Year 3</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <h4>Year 4</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <h4>Year 5</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <h4>Year 6</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <h4>Year 7</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <h4>Year 8</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <h4>Year 9</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
            </ul>
          </li>
          <li className="main-navigation-link">
            <Link href="/learners"><a>Learners Book <BiChevronDown/></a>
            </Link>
            <ul className="main-navigation-link-guide">
                <li>
                  <h4>Year 1</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <h4>Year 2</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <h4>Year 3</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <h4>Year 4</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <h4>Year 5</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <h4>Year 6</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <h4>Year 7</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <h4>Year 8</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <h4>Year 9</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li>
                  <h4>Senior Secondary</h4>
                  <Link href="/senior/english/beyond-the-word">
                    <a>Beyond the word</a>
                  </Link>
                  
                </li>
            </ul>
          </li>
                    
          <li className="main-navigation-link">
            <Link href="/learners">
              <a>Continuity Learning <BiChevronDown/></a>
            </Link>
            <ul className="main-navigation-link-guide">
                <li>
                  <h4>Year 1</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <h4>Year 2</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <h4>Year 3</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>
                <li className="main-navigation-link-guide-item">
                  <h4>Year 4</h4>
                  <Link href="/primary/mathematics">
                    <a>Mathematics</a>
                  </Link>
                  <Link href="/primary/english">
                    <a>English</a>
                  </Link>
                  <Link href="/primary/scient">
                    <a>Science</a>
                  </Link>
                  <Link href="/primary/social-studies">
                    <a>Social Studies</a>
                  </Link>
                  <Link href="/primary/art-and-culture">
                    <a>Arts and Culture</a>
                  </Link>
                  <Link href="/primary/physical-education">
                    <a>Physical Education</a>
                  </Link>
                </li>                
            </ul>
          </li>
          <li className="main-navigation-link">
            <Link href="/learners">
              <a>Contact Us <BiChevronDown/></a>
            </Link>
          </li>
        </ul>
        
        <ul className="main-navigation-main">
          {isAuth() && isAuth().role === 0 && (
              <li className="main-navigation-link">
                <Link href="/user">
                <a
                  >
                    User Dashboard
                </a>
                </Link>
              </li>              
            )}
        </ul>
        
        <ul className="main-navigation-main">
          {isAuth() && isAuth().role === 1 && (
              <li className="main-navigation-link">
                <Link href="/admin">
                <a>
                    Admin Dashboard
                </a>
                </Link>
              </li>              
            )}
        </ul>
        
        <ul className="main-navigation-main">
            {isAuth() && (
              <Fragment>
                <li className="main-navigation-link">
                  <Link href="/profile">
                      <a>My Profile</a>
                  </Link>
                </li>
                <li className="main-navigation-link">
                  <Link href="/">
                    <a onClick={() => signout(() => Router.replace("/"))}>
                        Signout
                    </a>
                  </Link>
                </li>
              </Fragment>
            )}
        </ul>
        
        <ul className="main-navigation-login">
            {!isAuth() && (
              <React.Fragment>
                <li><Login/></li>  
                <li><Register/></li>       
              </React.Fragment>
            )}                          
        </ul>

      </nav>
      
        {/* <Navbar>
          <NavItem link="Book Corner"/>
          <NavItem link="Home"/>
          <NavItem link="Syllabuses">
            <SyllabusDropdownMenu />
          </NavItem>
        </Navbar> */}
       
  
  </header>
  );
}

export default Header;