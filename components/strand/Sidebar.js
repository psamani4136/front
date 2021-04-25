import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { FaChevronCircleRight } from "react-icons/fa";
import {BiChevronDown} from "react-icons/bi"

// import Sidebar from "../../components/strand/Sidebar";
import { listRelatedStrands } from "../../actions/strand";
import { singleCategory } from "../../actions/category";
import { getYearStrandSubstrands } from "../../actions/year";   

const StrandSideBar = ({ strand, syllabus }) => {
  const [related, setRelated] = useState([]);
  const [relatedSyllabuses, setRelatedSyllabuses] = useState([]);
  const [displayContent, toggleDisplayContent] = useState(false);
  const [displayContentS12, toggleDisplayContentS12] = useState(false);
  const [relatedContent, toggleRelatedContent] = useState(false);
  const [strandContent, setStrandContent] = useState([]);
  
  const loadRelated = () => {
    listRelatedStrands({ strand }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, []);

  const showRelatedStrands = () => {
    return related.map((strand, i) => {
      return (
        <div key={i} className="mt-1 menu-button">
          <Link href="/strand/[slug]" as={`/strand/${strand.slug}`}>
            <a>
            <FaChevronCircleRight /> {" "}  
              {strand.title}   
            </a>
          </Link>
        </div>
      );
    });
  };

  const showSyllabusCategoryButton = () => {
    return syllabus.map((s, i) => {
        return (<button key={i} onClick={() => syllabusCategory(s.category.slug)} className="btn btn-primary" style={{width: "100%"}} >
          Click to view all {s.category.name}
        </button>)
    })
  }

  const syllabusCategory = (slug) => {
    singleCategory(slug).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelatedSyllabuses(data);
      }
    });
  }

  const showRelatedSyllabuses = () => {
    return relatedSyllabuses.map((syllabus, i) => {
      return (
        <div key={i} className="section-12-menu">
          <Link href="/syllabus/[slug]" as={`/syllabus/${syllabus.slug}`}>
            <a>
                <FaChevronCircleRight /> {""}
              {syllabus.subject.name}
              
            </a>
          </Link>
        </div>
      );
    });
  };

  const showAllYears = () => {
    return strand.years.map((year, i) => (
      <React.Fragment>
        <div key={i} className="mr-1 pb-1" >
          <button
            className="menu-button"
            onClick={() => yearSubstrandContent(year.slug)} 
          >
            <a>
            <FaChevronCircleRight /> {" "}  
            <strong>Year:</strong>  {year.name}
            </a>
          </button>
        </div>
      </React.Fragment>
    ));
  };

  const yearSubstrandContent = (slug) => {
    getYearStrandSubstrands(slug, {strand}).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        //push json data into a state
        setStrandContent(data);
      }
    });
  };

  const filteredContent = () => {
    return strandContent.map((s, i) => {
      return (
        <div key={i} className="substrand-content-display">
          <Link href="/substrand/[slug]" as={`/substrand/${s.slug}`}>
            <a>
              <FaChevronCircleRight /> {s.title}
            </a>
          </Link>
        </div>
      );
    });
  };

  const Introduction = () => {
    return syllabus.map((s, i) => {
      return(
        <div key={i}>
          {
            s.introduction.map((intro, i) => {
              return(
                <Link href="/introduction/[introduction]" as={`/introduction/${intro.introduction}`}>
                  <a style={{color: "black"}}>
                    <strong>Section 1:</strong> {intro.title} 
                  </a>
                </Link>
              )
            })
          }
        </div>
      )
    })
  }

  return <React.Fragment>
      <div className="sidebar-filler">
        <div>
            <p className="pt-1">
            Table of Contents
            </p>
            <div className="mb-2">
              <button className="menu-button foreword">
                Foreword
              </button>
            </div>
            <div className="mb-2">
              <button className="menu-button">
                {Introduction()}
              </button>
            </div>
            <div className="mb-2">
              <button className="menu-button">
                <strong>Section 2:</strong> Rationale
              </button>
            </div>
            <div className="mb-2">
              <button className="menu-button">
                <strong>Section 3:</strong> Aim
              </button>
            </div>

            <div className="mb-2">
              <button className="menu-button">
                <strong>Section 4:</strong> Syllabus structure
              </button>
            </div>
            
            <div className="mb-2">
              <button className="menu-button" onClick={() => toggleDisplayContent(!displayContent)} >
                <strong>Section 5:</strong> Strand statements <BiChevronDown/>
              </button>
            </div>
            <div className="row">
              {displayContent && <React.Fragment><div className="ml-2 mb-3">{showRelatedStrands()}</div></React.Fragment>}
            </div>


            <div className="mb-2">
              <button className="menu-button">
                <strong>Section 6:</strong> Processes and skills
              </button>
            </div>
            <div className="mb-2">
              <button className="menu-button">
                <strong>Section 7:</strong> Contribution to KLO
              </button>
            </div>
            <div className="mb-2">
              <button className="menu-button">
                <strong>Section 8:</strong> Learning, teaching and assessment
              </button>
            </div>
            <div className="mb-2">
              <button className="menu-button">
                <strong>Section 9:</strong> Curriculum profile
              </button>
            </div>
            <div className="mb-2">
              <button className="menu-button">
                <strong>Section 10:</strong> Scope and sequence
              </button>
            </div>
            <div className="mb-2 mt-2"><button className="menu-button"><strong>Section 11:</strong> Program Planner</button></div>


            <div className="mb-2">
              
                <button className="menu-button" onClick={() => toggleDisplayContentS12(!displayContentS12)}>
                  <strong>Section 12:</strong> Detail syllabus <BiChevronDown/>
                </button>
              
            <div>
              
            </div>
            <div className="row">
              {displayContentS12 && <React.Fragment><div className="ml-2 mt-2">{showAllYears()}</div></React.Fragment>}
            </div>  

            </div>
            <div className="mb-2">
              <button className="menu-button">
                <strong>Section 13:</strong> Learning and teaching resources
              </button>
            </div>
            <div className="mb-2">
              <button className="menu-button">
                <strong>Section 14:</strong> Tools and equipment
              </button>
            </div>
            <div className="mb-2">
              <button className="menu-button">
                <strong>Section 15:</strong> Formative and summative assessment
              </button>
            </div>
            <div className="mb-2">
              <button className="menu-button">
                <strong>Section 16:</strong> Glossary
              </button>
            </div>
            <div className="mb-2">
              <button className="menu-button">
                <strong>Section 17:</strong> References
              </button>
            </div>
            {/* <div className="mt-5 mb-2"><button className="btn btn-outline-primary" style={{width: "100%"}}><strong>Section 3:</strong> Assessment Planner</button></div> */}
        </div>
        <div className="mt-4">
          <span onClick={() => toggleRelatedContent(!relatedContent)} >{showSyllabusCategoryButton()}</span>
          {relatedContent && <Fragment><div className="mb-3 mt-3 ml-1">{showRelatedSyllabuses()}</div></Fragment>} 
        </div>
      </div>
    </React.Fragment>
};
export default StrandSideBar;
