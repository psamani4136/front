import React, { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import renderHTML from "react-render-html";
import Button from '@material-ui/core/Button';
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { Jumbotron } from "reactstrap";

import Layout from "../../components/Layout";
import DisqusThread from "../../components/DisqusThread";
import Assessment from "../../components/common/tabs/Assessmenttabs";
import Sidebar from "../../components/substrand/Sidebar";
import {
  singleSubstrandWithOutcomes,
  listRelatedSubstrands,
} from "../../actions/substrand";
import { getYearSubstrands } from "../../actions/year";
import { getSyllabusSection } from "../../actions/section";
import { getCategories } from "../../actions/category"; 
import { isAuth } from "../../actions/auth";
import SubstrandCarousal from "../../components/common/carousels/SubstrandCarousal";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

const Substrand = ({ substrand, strand, sectionSyllabus, router }) => {
  const head = () => (
    <Head>
      <title>
        {substrand.title} | {APP_NAME}
      </title>
      <meta
        name="description"
        content={`${substrand.title} for ${showStrand()}`}
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta property="og:title" content={`${substrand.title} | ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`${substrand.title} for ${showStrand()}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/emblem_1/png`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/emblem_1.png`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );
  const [related, setRelated] = useState([]);
  const [associated, setAssociated] = useState([]); 
  const [content, setContent] = useState([]);
  const [displayContent, toggleDisplayContent] = useState(false);
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
  
  const loadRelated = () => {
    listRelatedSubstrands({ substrand }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    initCategories();
    loadRelated();
  }, []);

  const showRelatedSubstrands = () => {
    return related.map((substrand, i) => {
      return (
        <article key={i}>
          <Link href="/substrand/[slug]" as={`/substrand/${substrand.slug}`}>
            <a>
              <p>
                <FaChevronCircleRight /> {substrand.title}
              </p>
            </a>
          </Link>
        </article>
      );
    });
  };

  // const showAllCategories = () => {
  //   return allCategories.map((category, i) => (
  //     <React.Fragment>
  //       <Link href="/categories/[slug]" as={`/categories/${category.slug}`} key={i}>
  //         <a className="btn font-weight-bold mr-1 ml-1 mt-3">{category.name}</a>
  //       </Link>
        
  //     </React.Fragment>
  //   ));
  // }

  const showAllCategories = () => {
    return allCategories.map((category, i) => (
      <Link href="/categories/[slug]" as={`/categories/${category.slug}`} key={i}>
        <a className="metabox__category-home-link" style={{letterSpacing: "1px"}}><i className="fa fa-home" aria-hidden="true"></i>{category.name}</a>
      </Link>
    ));
    }

  const showAllOutcomes = () => {
    return substrand.outcomes.map((o, i) => {
      return (
        <tr key={i} >
               {isAuth() && (
                 <React.Fragment>
                      <td>
                        <Link href="/outcome/[slug]" as={`/outcome/${o.slug}`}>
                        {/* <Link href="/outcome/[slug]" as={`/outcome/${o.slug}`}> */}
                          <a>{renderHTML(o.general)}</a>
                        </Link>
                      </td>
                      <td>
                        {o.indicators.map((specific, i) => (
                          <div>{renderHTML(specific.specific)}</div>
                        ))}
                      </td>
                      <td></td>
                  </React.Fragment> 
              )}
          
              {!isAuth() && 
                <React.Fragment>
                  
                    <td>
                      {renderHTML(o.general)}
                      
                    </td>
                    <td>
                      {o.indicators.map((specific, i) => (
                        <div>{renderHTML(specific.specific)}</div>
                      ))}
                    </td>
                    <td></td>
                    
                </React.Fragment> 
              }
          
        </tr>
      );
    });
  };

  const showStrand = () => {
    return strand.map((s, i) => {
      return (
        <div key={i}>
            {s.title}
          <br />
        </div>
      );
    });
  };

  const yearContent = (slug) => {
    getYearSubstrands(slug, { substrand }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        //push json data into a component within a predefined state
        setContent(data);
      }
    });
  };

  const filteredContent = () => {
    return content.map((s, i) => {
      return (
        <div key={i} className="mb-3">
          <Link href="/substrand/[slug]" as={`/substrand/${s.slug}`}>
            <a>
              <FaChevronCircleRight /> {s.title}
            </a>
          </Link>
        </div>
      );
    });
  };

  // const filteredYear = () => {
  //   return content.map((s, i) => {
  //     return <article key={i}>{s.years.name}</article>;
  //   });
  // };

  const showAllYears = () => {
    return strand.map((s, i) => {
      return (
        <div key={i}>
          {s.years.map((year, i) => {
            return (
                <Button
                className="mr-3"
                variant="contained" 
                color="primary"
                onClick={() => 
                  yearContent(year.slug)  
                }
                
              >
                Year {year.name}
              </Button>
            );
          })}
        </div>
      );
    });
  };

  const showTerm = () => {
    return substrand.terms.map((t, i) => {
      return (
        <article key={i}>
          <strong>Term:</strong> {t.name}
        </article>
      );
    });
  };

  const loadAllSyllabusButton = () => {
    return (
        <div className="btn btn-outline-primary font-weight-bold mt-2">
          <Link  href={`/syllabus`}>
            <a><strong>Download</strong></a>
          </Link>
        </div> 
    );
  };

  const syllabusSection = (slug) => {
    getSyllabusSection(slug, substrand).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setAssociated(data);
      }
    });
  }
  const staticContent = () => {
    return (
      <React.Fragment>
        <div className="mt-2 ml-3">
                  <div>
                    <table class="content-table">
                      <tbody>
                        <tr>
                          <td colspan="3"><span className="mr-3"><strong>Subject:</strong></span>{substrand.subject.name}<span className="ml-5">Year: {substrand.years.name}</span></td>
                          
                        </tr>
                        <tr>
                          <td colspan="3">{showStrand()}</td>
                        </tr>
                        <tr>
                          <td colspan="3"><strong>Substrand: </strong>{substrand.title}
                            <span className="ml-5"><strong>Periods: </strong></span>
                            {substrand.periods}<br/>
                            {renderHTML(substrand.statement)} 
                          </td>
                        </tr>
                        
                        <tr style={{backgroundColor: "black", color: "white"}}>
                          <th>General Learning Outcomes</th>
                          <th>Specific Learning Outcomes</th>
                          <th>Suggested Assessment Event</th>
                        </tr>
                        <tr>
                          <td><strong>Learners should: <br/></strong> 
                          </td>
                          <td><strong>Learners should be able to: <br/></strong></td>
                          <td><strong>Learners can be assessed on: <br/></strong></td>
                        </tr>                       
                        {showAllOutcomes()} 
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="substrand-assessment-holder">
                  <div className="substrand-assessment-instruction">Below are the details for the assessment of this substrand. All information regarding this assessment is given in the tabs below. You can click the download button below to get copy of this assessment for your reference.</div>
                  <div>
                    <Assessment substrand={substrand} />
                  </div>
                </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {head()}
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
                <h1 className="page-banner__title">{substrand.subject.name} Syllabus</h1>
                <div className="page-banner__intro">
                    <p>This is the {substrand.subject.name} Syllabus was published and is now available in <br />Solomon Islands Schools.
                      This page contains the introductory section <br />of this syllabus document. To reach the detail part you can click on the <br />year level below. {loadAllSyllabusButton()}</p>
                </div>
              </div> 
            
            </div>
            {/* <div className="container" style={{marginTop:"-20px"}}>
              <div className="float-right">
                {showAllCategories()}
              </div>
            </div> */}
          </section>
        
          <section>
            <div className="core-container">
              <div className="sidebar-wrapper"> 
                <Sidebar substrand={substrand} syllabusSection={syllabusSection}/>
              </div>
              <div className="main-content-wrapper ml-5">
                <div className="instruction-wrapper">
                  
                  <div className="substrand-content-wrapper">
                        <div className="substrand-content-title mt-5 pt-3"> 
                          <div className="instruction-holder"> 
                            <div className="pb-2">
                              <span onClick={() => toggleDisplayContent(!displayContent)} style={{border: "none"}}>
                                <strong>{showAllYears()}</strong>
                              </span> 
                            </div>
                            <div>
                            <strong>
                            Note:{"  "}
                            </strong>The buttons above contains all the substrands in each year level. Click to view. <br/>
                            All year level substrands should be shown below.
                            </div>
                            
                          </div>
                        </div>
                          {displayContent && <React.Fragment><div className="substrand-content-display">
                            {filteredContent()}
                          </div></React.Fragment>}
                  </div>
                </div>
                  {associated.foreword ? JSON.stringify(associated) : staticContent()}
                  {/* {associated.acknowledgement ? JSON.stringify(associated) : staticContent()} */}
                  {/* {associated.introduction ? JSON.stringify(associated) : staticContent()} */}
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Substrand.getInitialProps = ({ query }) => {
  return singleSubstrandWithOutcomes(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        substrand: data.substrand,
        strand: data.strand,
      };
    }
  });
};

export default withRouter(Substrand);
