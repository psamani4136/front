import React, { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import renderHTML from "react-render-html";
import Button from '@material-ui/core/Button';
// import { Jumbotron, Button } from "reactstrap";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";

import Layout from "../../components/Layout";
import { singleStrand } from "../../actions/strand";
import { getYearStrandSubstrands } from "../../actions/year";         
import { getCategories } from "../../actions/category"; 
import StrandCarousal from "../../components/common/carousels/StrandCarousal";
import SubstrandTabs from "../../components/common/tabs/Substrandtabs";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import Sidebar from "../../components/strand/Sidebar";
import SidebarSyllabus from "../../components/strand/SidebarSyllabus";

const Strand = ({ strand, syllabus, router }) => {
  const head = () => (
    <Head>
      <title>
        {strand.title} | {APP_NAME}
      </title>
      <meta
        name="description"
        content={`${strand.title} for ${showSyllabusTitle()}`}
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta property="og:title" content={`${showSyllabusTitle()} | ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`${showSyllabusTitle()} for ${showSyllabusTitle()}`}
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
  // const [related, setRelated] = useState([]);

  // const loadRelated = () => {
  //   listRelatedStrands({ strand }).then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       setRelated(data);
  //     }
  //   });
  // };
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

  useEffect(() => {
    // yearStrandContent();
    initCategories();
  }, []);

  // const showAllCategories = () => {
  //   return allCategories.map((category, i) => (
  //     <Link href="/categories/[slug]" as={`/categories/${category.slug}`} key={i}>
  //       <a className="btn font-weight-bold mr-1 ml-1 mt-3">{category.name}</a>
  //     </Link>
  //   ));
  // }

  const showAllCategories = () => {
    return allCategories.map((category, i) => (
      <Link href="/categories/[slug]" as={`/categories/${category.slug}`} key={i}>
        <a className="metabox__category-home-link "><i className="fa fa-home" aria-hidden="true"></i>{category.name}</a>
      </Link>
    ));
    }

  // const showRelatedStrands = () => {
  //   return related.map((strand, i) => {
  //     return (
  //       <article key={i}>
  //         <Link href={`/strand/${strand.slug}`}>
  //           <a>
  //             <p>
  //               <FaChevronCircleRight /> {""}
  //               <strong>{strand.title}</strong>
  //             </p>
  //           </a>
  //         </Link>
  //       </article>
  //     );
  //   });
  // };

  const [strandContent, setStrandContent] = useState([]);

  const showAllSubstrands = () => {
    return strand.substrands.map((substrand, i) => {
      return (
        <div className="strand-substrand-filter" key={i}>
          <Link href="/substrand/[slug]" as={`/substrand/${substrand.slug}`}>
            <a>
              <FaChevronCircleRight /> {"   "}
              {substrand.title}
            </a>
          </Link>
        </div>
      );
    });
  };

  const showSyllabusTitle = () => {
    return syllabus.map((s, i) => {
      return (
        <span key={i}>
          {s.subject.name}
        </span>
      );
    });
  };

  // const showSyllabus = () => {
  //   return syllabus.map((s, i) => {
  //     return (
  //       <article key={i}>
  //         {/* <Link href="/syllabus/[slug]" as={`/syllabus/${s.subject.slug}`}>
  //           <a className="pl-5 pt-2">
  //             <h3 className="pl-3 pt-3 pb-3 font-weight-bold">
  //               <FaChevronCircleLeft /> {""}
                
  //             </h3>
  //           </a>
  //         </Link> */}
  //         <Link href="/syllabus/[slug]" as={`/syllabus/${s.subject.slug}`}>
  //           <a className="btn btn-primary font-weight-bold mr-1 ml-1 mt-3">View Syllabus Introduction</a>
  //         </Link>
  //       </article>
  //     );
  //   });
  // };

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

  // const mySyllabus = () => {
  //   return syllabus.map((s, i) => {
  //     return <div key={i}>{s.subject}</div>;
  //   });
  // };

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

  const showAllYears = () => {
    return strand.years.map((year, i) => (
      <React.Fragment key={i}>
        <Button
          className="mr-3"
          variant="contained" 
          color="primary"
          onClick={() => yearSubstrandContent(year.slug)}
          // className="btn btn-primary font-weight-bold mr-3"
        >
          Year {year.name}
          
        </Button>
        
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
                <h1 className="page-banner__title">{showSyllabusTitle()}</h1>
                <div className="page-banner__intro">
                    <p>This is the {showSyllabusTitle()} published and is now available in <br />Solomon Islands Schools.
                      This page contains the strand section of <br /> this syllabus document.<br /> {loadAllSyllabusButton()}</p>
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
                <Sidebar strand={strand} syllabus={syllabus}/>
              </div>
              <div className="main-content-wrapper">
                {/* <div className="instruction-wrapper">
                  <h4 className="font-weight-bold">All substrands</h4>
                  <div className="instruction-holder"> 
                    <strong>
                    Note:
                    </strong>The buttons below contains all the substrands in each year level. Click to view.
                  </div>
                  <div className="instruction-holder">
                    <span onClick={() => toggleDisplayContent(!displayContent)} style={{border: "none"}}>
                        <strong>{showAllYears()}</strong> 
                    </span>
                  </div>
                </div>
                <div className="substrand-content-wrapper">
                  <div className="substrand-content-title">All year level substrands </div>
                    {displayContent && <React.Fragment><div className="substrand-content-display">
                      {filteredContent()}
                  </div></React.Fragment>}
                </div> */}

                <div className="strand-wrapper">
                  <div className="strand-wrapper-title">
                    <h4 className="font-weight-bold">{strand.title}</h4>
                    <p>{renderHTML(strand.statement)}</p>
                  </div>
                  <div className="associated-wrapper">
                    <div className="associated-wrapper-title">All Substrands of this strand</div>
                    <div>{showAllSubstrands()}</div>
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

Strand.getInitialProps = ({ query }) => {
  return singleStrand(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        strand: data.strand,
        syllabus: data.syllabus,
      };
    }
  });
};

export default withRouter(Strand);
