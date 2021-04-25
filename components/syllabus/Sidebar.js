import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";

// import Sidebar from "../../components/syllabus/Sidebar";
import { listRelatedSyllabuses, listRelatedSyllabusesSection } from "../../actions/syllabus";
import { singleCategory } from "../../actions/category";
import { getSectionSyllabus } from "../../actions/section";

const SyllabusSideBar = ({ syllabus, sectionSyllabus }) => {
  const [related, setRelated] = useState([]);
  const [relatedSection, setRelatedSection] = useState([]);
  const [relatedSyllabuses, setRelatedSyllabuses] = useState([]);
  const [displayContent, toggleDisplayContent] = useState(false);
  const [relatedContent, toggleRelatedContent] = useState(false);
  

  const loadRelated = () => {
    listRelatedSyllabuses({ syllabus }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  const loadRelatedSections = () => {
    listRelatedSyllabusesSection({ syllabus }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelatedSection(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
    loadRelatedSections();
  }, []);

  const showRelatedSyllabuses = () => {
    return related.map((syllabus, i) => {
      return (
        <div key={i} className="mt-2">
          <Link
            href="/syllabus/[slug]"
            as={`/syllabus/${syllabus.subject.slug}`}
          >
            <a>
              
                <FaChevronCircleRight /> {syllabus.subject.name}
              
            </a>
          </Link>
        </div>
      );
    });
  };

  const showSyllabusCategoryButton = () => {
        return (<button onClick={() => syllabusCategory(syllabus.category.slug)} className="btn btn-primary" style={{width: "100%"}} >
          Click to view all {syllabus.category.name}
        </button>)
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


  const showAllStrands = () => {
    return syllabus.strands.map((strand, i) => {
      return (
        <div key={i} className="mt-2">
          <Link href="/strand/[slug]" as={`/strand/${strand.slug}`}>
            <a>
            <FaChevronCircleRight /> {strand.title}
            </a>
          </Link>
        </div>
      );
    });
  };

    const showAllSections = () => {
    return relatedSection.map((section, i) => {
      return (
        <div key={i} className="mt-2">
            <button className="menu-button" onClick={() => sectionSyllabus(section.slug)}>
              <strong>{section.title}</strong> {section.subtitle}  
            </button>
        </div>
      );
    });
  };
    
  return <React.Fragment>
      <div className="sidebar-filler">
        <div>
            <p className="pt-1">
            Table of contents
            </p>
        </div>
        {showAllSections()}
        <div className="mt-4">
          <span onClick={() => toggleRelatedContent(!relatedContent)} >{showSyllabusCategoryButton()}</span>
          {relatedContent && <Fragment><div className="mb-3 mt-3 ml-1">{showRelatedSyllabuses()}</div></Fragment>} 
        </div>
        <div className="mt-4">
            <button className="btn btn-primary" onClick={() => toggleDisplayContent(!displayContent)} style={{width: "100%"}}>
              View all<strong> All Strands</strong>
          </button>
        </div>
        <div className="row">
          {displayContent && <React.Fragment><div className="ml-1 mb-3">{showAllStrands()}</div></React.Fragment>}
        </div> 
      </div>
            
    </React.Fragment>
};
export default SyllabusSideBar;
