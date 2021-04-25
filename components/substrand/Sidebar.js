import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { FaChevronCircleRight  } from "react-icons/fa";
import { FiChevronsLeft } from "react-icons/fi";

import { listRelatedSyllabuses, listRelatedStrands } from "../../actions/substrand";
import { singleCategory } from "../../actions/category";
import { getSubstrandSyllabusSections } from "../../actions/section";

const SideBar = ({ substrand, syllabusSection }) => {
  const [related, setRelated] = useState([]);
  const [relatedStrands, setRelatedStrands] = useState([]);
  const [relatedSections, setRelatedSections] = useState([]);
  const [relatedSyllabuses, setRelatedSyllabuses] = useState([]);
  const [displayContent, toggleDisplayContent] = useState(false);
  const [displayMyContent, toggleDisplayMyContent] = useState(false);

  const loadRelated = () => {
    listRelatedSyllabuses({ substrand }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  const loadSections = () => {
    getSubstrandSyllabusSections({ substrand }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelatedSections(data);
      }
    });
  };


  useEffect(() => {
    loadRelated();
    listMyRelatedSyllabuses();
    loadSections();
    
  }, []);

  const showRelatedSyllabuses = () => {
    return related.map((data, i) => {
      return (
        <button key={i} className="btn btn-primary" onClick={() => listMyRelatedSyllabuses(data.category.slug)} style={{width: "100%"}}>
          <strong>View all {data.category.name}</strong> 
        </button>
      );
    });
  };

  const showSyllabusSections = () => {
    return relatedSections.map((related, i) => {
      return (
        // <button key={i} className="btn btn-primary" onClick={() => listMyRelatedSyllabuses(data.category.slug)} style={{width: "100%"}}>
        <div key={i} className="mt-2">
          {/* <button className="menu-button" onClick={() => sectionSyllabus(section.slug)}> */}
          <button className="menu-button" onClick={() => syllabusSection(related.slug)}>
            <strong>{related.title}</strong> {related.subtitle}  
          </button>
        </div>
      );
    });
  };

  
  const showStrands = () => {
    return related.map((data, i) => {
      return (
        <div key={i}>
          {data.strands.map((strand, i) => {
            return (
              <div className="mt-2">
                <Link href="/strand/[slug]" as={`/strand/${strand.slug}`}>
                  <a>
                    <FaChevronCircleRight /> {""}
                    {strand.title}
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      );
    });
  };
            
  const listMyRelatedSyllabuses =(slug) => {
        singleCategory(slug).then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            setRelatedSyllabuses(data);
        }
    });
  }


  const showCategoryRelatedSyllabuses = () => {
    return relatedSyllabuses.map((syllabus, i) => {
        return (
          <div key={i}  className="mt-2">
            <Link href="/syllabus/[slug]" as={`/syllabus/${syllabus.subject.slug}`}>
              <a>
                <FaChevronCircleRight /> {""}
                {syllabus.subject.name}
              </a>
            </Link>
          </div>
        );
      });
  }
   
  return <React.Fragment>
      <div className="sidebar-filler">
        
            <p className="pt-1">
            
            Table of contents
            </p>
            {showSyllabusSections()}
        
        <div className="mt-4">
          <span onClick={() => toggleDisplayMyContent(!displayMyContent)} style={{width: "100%"}}>{showRelatedSyllabuses()}</span>
          {displayMyContent && <Fragment><div className="mb-3 mt-3 ml-1">{showCategoryRelatedSyllabuses()}</div></Fragment>} 
        </div>
        <div className="mt-4">
          <Link href="/syllabus/[slug]" as={`/syllabus/${substrand.subject.slug}`}>
              <a> <FiChevronsLeft/> BACK</a>
          </Link>
        </div>
        
      </div>
    </React.Fragment>
};

export default SideBar;
