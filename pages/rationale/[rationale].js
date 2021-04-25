import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import renderHTML from "react-render-html";

import Layout from "../../components/Layout";
import { singleRationale } from "../../actions/rationale";  
import Sidebar from "../../components/rationale/Sidebar"; 
import { getCategories } from "../../actions/category"; 

const Rationale = ({rationale, syllabus, router}) => {

  const [allCategories, setAllCategories] = useState([])
  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setAllCategories(data)
      }
    })
  }

  useEffect(() => {
    initCategories();
  }, []);

  const showAllCategories = () => {
    return allCategories.map((category, i) => (
      <Link href="/categories/[slug]" as={`/categories/${category.slug}`} key={i}>
        <a className="metabox__category-home-link "><i className="fa fa-home" aria-hidden="true"></i>{category.name}</a>
      </Link>
    ));
    }

    const showSyllabusTitle = () => {
        return syllabus.map((s, i) => (
          <React.Fragment key={i}>
            {s.subject.name}
          </React.Fragment>
        ));
    };

    const loadAllSyllabusButton = () => {
        return (
            <div className="btn btn-outline-primary font-weight-bold mt-2">
              <Link  href={`/syllabus`}>
                <a>Download</a>
              </Link>
            </div>
        );
      };

    return (
        <React.Fragment>
          
          <Layout>
            <main>
              <section className="head-section">
                <div className="page-banner">
                  <div className="page-banner__bg-image-substrand">
                    <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop" id="herovideo">
                          <source src="../../static/videos/video_6.mp4" type="video/mp4"/>
                    </video> 
                  </div>    
                  <div className="page-banner__content container container--narrow">
                    <h1 className="page-banner__title">{showSyllabusTitle()}</h1>
                    <div className="page-banner__intro">
                        <p>This is the {showSyllabusTitle()} published and is now available in <br />Solomon Islands Schools.
                          This page contains the rationale section <br />of this syllabus document. <br /> {loadAllSyllabusButton()}</p>
                    </div>
                  </div> 
                
                </div>
                
                <div className="container" style={{marginTop:"-20px"}}>
                  <div className="text-center">
                    {showAllCategories()}
                  </div>
                </div>
              </section>
    
              {/* ============================ */}
              <section>
                <div className="core-container">
                  <div className="sidebar-wrapper"> 
                    {/* <Sidebar syllabus={syllabus}/> */}
                    <Sidebar syllabus={syllabus}/>
                  </div>
                  <div className="main-content-wrapper">    
                    <div className="strand-wrapper">
                      <div className="strand-wrapper-title">
                        <h4 className="font-weight-bold">Section 2: {rationale.title}</h4>
                        <p>{renderHTML(rationale.body)}</p>
                        
                      </div>
                      
                    </div>
                  </div>
                  
                </div>
                
              </section>
             
            </main>
          </Layout>
        </React.Fragment>
      );
    };


Rationale.getInitialProps = ({ query }) => {
    return singleRationale(query.rationale).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        return {
          rationale: data.rationale,
          syllabus: data.syllabus
        };
      }
    });
  };

  export default withRouter(Rationale);