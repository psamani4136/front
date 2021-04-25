import React, {Fragment } from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { withRouter } from "next/router";
import renderHTML from "react-render-html";
import { FaChevronCircleRight } from "react-icons/fa";
import Button from '@material-ui/core/Button';
// import { Button } from 'reactstrap';
// import { Jumbotron } from "reactstrap";       

import { singleSyllabus, getSyllabuses } from "../../actions/syllabus";
import { singleIntroduction } from "../../actions/introduction"
import { singleRationale } from "../../actions/rationale"
//import { getYearWithAllSubstrands } from "../../actions/year"
import { getYearSubstrands, getYearWithAllSubstrands } from "../../actions/year";
import { singleAim } from "../../actions/aim"
import { getCategories } from "../../actions/category";
import Syllabus from "../../components/common/tabs/Syllabustabs";
import MainCarousal from "../../components/common/carousels/SyllabusCarousal";
import SyllabusHero from "../../components/syllabus/TitleSection";
import Sidebar from "../../components/syllabus/Sidebar";
import SyllabusSections from "../../components/syllabus/SyllabusSections";
import { listRelatedSyllabuses } from "../../actions/syllabus";

import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { get } from "js-cookie";
import Modal from "../../components/introduction/introductionModal"
import ModalRationale from "../../components/rationale/rationaleModal"
import ModalAim from "../../components/aim/aimModal"
import section from "../../../backend/models/section";
import { getSectionSyllabus } from "../../actions/section";

const SingleSyllabus = ({ syllabus, router }) => {
  const head = () => (
    <Head>
      <title>
        {syllabus.subject.name} | {APP_NAME}
      </title>
      <meta
        name="description"
        content={`${syllabus.subject.name} for use across the Solomon Islands schools`}
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`${syllabus.subject.name} | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content={`${syllabus.subject.name} for use in Solomon Islands Schools`}
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

  const [associated, setAssociated] = useState([]);
  
  const [content, setContent] = useState([]);
  const [displayContent, toggleDisplayContent] = useState(false);
  
  // const [relatedContent, toggleRelatedContent] = useState(false);

  // const showAllStrands = () => {
  //   return syllabus.strands.map((strand, i) => {
  //     return (
  //       <div key={i} className="col-md-12">
  //         <Link href="/strand/[slug]" as={`/strand/${strand.slug}`}>
  //           <a>
  //             <FaChevronCircleRight /> {strand.title}
  //           </a>
  //         </Link>
  //       </div>
  //     );
  //   });
  // };

  
  // const [allSyllabuses, setAllSyllabuses] = useState([])
  // const [introduction, setIntroduction] = useState([])
  // const [rationale, setRationale] = useState([])
  // const [aim, setAim] = useState([])
  
  // const initCategories = () => {
  //   getCategories().then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       setAllCategories(data)
  //     }
  //   })
  // }

  // useEffect(()=> {
  //   initCategories();
  // }, [])

  // const showAllCategories = () => {
  //   return allCategories.map((category, i) => (
  //     <Link href="/categories/[slug]" as={`/categories/${category.slug}`} key={i}>
  //       <a className="btn font-weight-bold mr-1 ml-1 mt-3">{category.name}</a>
  //     </Link>
  //   ));
  // }

  // const showAllSubstrands = () => {
  //   return strand.substrands.map((substrand, i) => {
  //     return (
  //       <div className="mb-2" key={i}>
  //         <div className="float-left">
  //           {" "}
  //           {/* <strong>Year {substrand.years.name}</strong> */}
  //         </div>
  //         <Link href="/substrand/[slug]" as={`/substrand/${substrand.slug}`}>
  //           <a className="ml-2">
  //             <FaChevronCircleRight /> {"   "}
  //             <strong>{substrand.title}</strong>
  //           </a>
  //         </Link>
  //       </div>
  //     );
  //   });     
  // };

  // const [displayContent, toggleDisplayContent] = useState(false);
  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelatedSyllabuses({ syllabus }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
    // sectionSyllabus();
  }, []);

  // const showRelatedSyllabuses = () => {
  //   return related.map((syllabus, i) => {
  //     return (
  //       <div className="syllabus-titles" key={i}>
  //         <Link
  //           href="/syllabus/[slug]"
  //           as={`/syllabus/${syllabus.subject.slug}`}
  //         >
  //           <a>
  //             <FaChevronCircleRight /> {syllabus.subject.name}
  //           </a>
  //         </Link>
  //       </div>
  //     );
  //   });
  // };

  // const showAllStrands = () => {
  //   return syllabus.strands.map((strand, i) => {
  //     return (
  //       <div key={i} className="col-md-12">
  //         <Link href="/strand/[slug]" as={`/strand/${strand.slug}`}>
  //           <a>
  //             <p><FaChevronCircleRight /> {strand.title}</p>
  //           </a>
  //         </Link>
  //       </div>
  //     );
  //   });
  // };
  
  
  const showAllYears = () => {
    return syllabus.years.map((year, i) => (
            <button
              key={i}
              style={{marginTop: "10px", marginRight: "20px"}}
              className="btn btn-primary"
              onClick={() => 
                yearSubstrands(year.slug)  
              }
            >
              <strong>Year {year.name}</strong>
            </button>
    ));
  };

  const yearSubstrands = (slug) => {
    getYearWithAllSubstrands(slug, { syllabus }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        //push json data into setContent state 
        setContent(data);
      }
    });
  };

  const filteredContent = () => {              
    return content.map((s, i) => {
      return (
        <div key={i} className="mb-2">
          <Link href="/substrand/[slug]" as={`/substrand/${s.slug}`}>
            <a className="menu-button" style={{color: "blue"}}><FaChevronCircleRight /> {s.title}</a>
          </Link>
          {/* <button className="menu-button" style={{color: "blue"}}>
          <FaChevronCircleRight />{" "}{s.title}
          </button> */}
        </div>
      );
    });
  };

  const sectionSyllabus = (slug) => {
    getSectionSyllabus(slug, {syllabus}).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setAssociated(data);
      }
    });
  }

  const foreword = () => {
    return associated.foreword.map((f, i) => {
      return(
        <React.Fragment>
          <div key={i} className="mt-2 ml-3">
            <div>
              <strong><h2>{f.identifier.title} {f.identifier.subtitle}</h2></strong>
            </div>
            <p>{renderHTML(f.body)}</p>
            <div className="mt-5"><p>{renderHTML(f.title)}</p></div>
          </div>
        </React.Fragment>
      )
    })
  }

  const acknowledgement = () => {
    return associated.acknowledgement.map((a, i) => {
      return(
        <React.Fragment>
          <div key={i} className="mt-2 ml-3">
            <div>
              <strong><h2>{a.identifier.title} {a.identifier.subtitle}</h2></strong>
            </div>
            <p>{renderHTML(a.body)}</p>
          </div>
          
        </React.Fragment>
      )
    })
  }

  const sectionIntroduction = () => {
    return associated.introduction.map((introduction, i) => {
      return(
        <div key={i} className="mt-2 ml-3">
          <div>
              <strong><h2>{introduction.identifier.title} {introduction.identifier.subtitle}</h2></strong>
            </div>
          <p>{renderHTML(introduction.body)}</p>
        </div>
      )
    })
  }

  const sectionRationale = () => {
    return associated.rationale.map((rationale, i) => {
      return(
        <div key={i} className="mt-2 ml-3">
          <div>
              <strong><h2>{rationale.identifier.title} {rationale.identifier.subtitle}</h2></strong>
          </div>
          <p>{renderHTML(rationale.body)}</p>
        </div>
      )
    })
  }

  const sectionAim = () => {
    return associated.aim.map((a, i) => {
      return(
        <div key={i} className="mt-2 ml-3">
          <div>
              <strong><h2>{a.identifier.title} {a.identifier.subtitle}</h2></strong>
          </div>
          <p>{renderHTML(a.body)}</p>
        </div>
      )
    })
  }

  const sectionStrand = () => {
    return associated.strand.map((s, i) => {
      return(
        <React.Fragment>
          <div key={i}  className="mt-2 ml-3">
            <div>
                {/* <strong><h2>{s.identifier.title} {s.identifier.subtitle}</h2></strong> */}
                {s.identifier ?  <strong><h2>{s.identifier.title} {s.identifier.subtitle}</h2></strong>: null}
            </div>
            <strong><h6>{renderHTML(s.title)}</h6></strong>
          </div>
          <div className="mt-2 ml-3">
            <p>{renderHTML(s.body)}</p>
          </div>
        </React.Fragment>
        
      )
    })
  }

  const sectionAssessment = () => {
    return associated.assessment.map((a, i) => {
      return(
        <React.Fragment>
          <div key={i}  className="mt-2 ml-3">
            <div>
                <strong><h2>{a.identifier.title} {a.identifier.subtitle}</h2></strong>
            </div>
            <p>{renderHTML(a.body)}</p>
          </div>
        </React.Fragment>
        
      )
    })
  }

  const sectionReference = () => {
    return associated.reference.map((r, i) => {
      return(
        <React.Fragment>
          <div key={i}  className="mt-2 ml-3">
            <div>
                <strong><h2>{r.identifier.title} {r.identifier.subtitle}</h2></strong>
            </div>
            <p>{renderHTML(r.body)}</p>
          </div>
        </React.Fragment>
        
      )
    })
  }

  const sectionGlossary = () => {
    return associated.glossary.map((g, i) => {
      return(
        <React.Fragment>
          <div key={i}  className="mt-2 ml-3">
            <div>
                <strong><h2>{g.identifier.title} {g.identifier.subtitle}</h2></strong>
            </div>
            <div className="mt-3"><p>{renderHTML(g.body)}</p></div>
          </div>
        </React.Fragment>
      )
    })
  }

  const sectionContribution = () => {
    return associated.contribution.map((g, i) => {
      return(
        <React.Fragment>
          <div key={i}  className="mt-2 ml-3">
            <div>
                <strong><h2>{g.identifier.title} {g.identifier.subtitle}</h2></strong>
            </div>
            <p>{renderHTML(g.introduction)}</p>
            <table class="content-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Key Learning Outcomes</th>
                  <th>{renderHTML(g.title)} contribution</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                <td><strong><h6>1</h6></strong></td>
                  <td><strong>Culture promotion <br/>
                      </strong>Awareness of the Solomon Islands culture;
                      in particular, the promotion of the concept of
                      ‘unity in diversity’, the need for equity, and
                      inclusiveness.
                  </td>
                  <td>{renderHTML(g.culture)}</td>
                  
                </tr>
                <tr>
                <td><strong><h6>2</h6></strong></td>
                  <td><strong>Lifelong learning<br/>
                        </strong>Realisation that learning is a lifelong
                        experience; encouragement of innovation,
                        creativity, and a positive view of learning
                        post-school.
                  </td>
                  <td>{renderHTML(g.lifelong)}</td>
                  
                </tr>
                <tr>
                <td><strong><h6>3</h6></strong></td>
                  <td><strong>Ethics and good citizenship<br/></strong>Development of positive, moral and ethical
                      values, respect for others, based on personal
                      integrity and social responsibility; focused on:
                      values education; civics and citizenship.
                  </td>
                  <td>{renderHTML(g.citizenship)}</td>
                </tr>
                <tr>
                <td><strong><h6>4</h6></strong></td>
                  <td><strong>Peace and Reconciliation<br/></strong>Development of positive attitudes with the
                      mind and heart to create peace, reconciliation
                      and be able to live in harmony in a multi-
                      ethnic diverse community.
                  </td>
                  <td>{renderHTML(g.peace)}</td>
                </tr>
                <tr>
                <td><strong><h6>5</h6></strong></td>
                  <td><strong>Technology<br/></strong>Use of appropriate traditional and modern
                      technology to improve livelihoods and
                      community standards of living.
                  </td>
                  <td>{renderHTML(g.technology)}</td>
                </tr>
                <tr>
                <td><strong><h6>6</h6></strong></td>
                  <td><strong>Entrepreneurship</strong><br/>The development of entrepreneurial skills for
                        job creation through initiative and creativity.
                  </td>
                  <td>{renderHTML(g.entrepreneurship)}</td>
                </tr>
                <tr>
                <td><strong><h6>7</h6></strong></td>
                  <td><strong>Preservation, Conservation of
                      Environment and Climate Change
                      </strong><br/>The development of positive attitudes
                        and values towards the preservation and
                        conservation of the environment and
                        adaptation and management of the effects of
                        climate change.
                  </td>
                  <td>{renderHTML(g.preservation)}</td>
                </tr>
                <tr>
                <td><strong><h6>8</h6></strong></td>
                  <td><strong>Development of the whole person</strong><br/>Development of the whole person including
                    social, physical, mental and spiritual life of
                    the individual, environmental and health
                    awareness and good health practices.</td>
                  <td>{renderHTML(g.development)}</td>
                </tr>
                <tr>
                  <td><strong><h6>9</h6></strong></td>
                  <td><strong>Financial Literacy</strong><br/>Financial literacy is an important element of everyday living as financial spending becomes everyday interaction.<br/>
                  </td>
                  <td>{renderHTML(g.financial)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </React.Fragment>
      )
    })
  }

  const sectionStructure = () => {
    return associated.structure.map((s, i) => {
      return(
        <React.Fragment>
          <div key={i}  className="mt-2 ml-3">
            <div>
              <strong><h2>{s.identifier.title} {s.identifier.subtitle}</h2></strong>
            </div>
            <div className="mt-3"><p>{renderHTML(s.introduction)}</p></div>
            <div>
              <table class="content-table">
                {/* <thead>
                  <tr>
                    <th>General Learning Outcomes</th>
                    <th>Specific Learning Outcomes</th>
                    <th>Suggested Assessment Event</th>
                    
                  </tr>
                </thead> */}
                <tbody>
                  <tr>
                    <td colspan="3"><strong>Subject: title: Science Year no. </strong>This section will be coded as 5 to represent year 5</td>
                    {/* <td></td>
                    <td></td> */}
                  </tr>
                  <tr>
                    <td colspan="3">{renderHTML(s.strand)}</td>
                    
                  </tr>
                  <tr>
                  <td colspan="3">{renderHTML(s.substrand)}</td>
                    
                  </tr>
                  
                  <tr style={{backgroundColor: "black", color: "white"}}>
                    <th>General Learning Outcomes</th>
                    <th>Specific Learning Outcomes</th>
                    <th>Suggested Assessment Event</th>
                  </tr>
                  
                  <tr>
                    <td><strong>Learners should: <br/></strong>
                        {renderHTML(s.glo)}
                    </td>
                    <td><strong>Learners should be able to: <br/></strong>{renderHTML(s.slo)}</td>
                    <td><strong>Learners can be assessed on: <br/></strong>{renderHTML(s.sae)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </React.Fragment>
      )
    })
  }

  const sectionResource = () => {
    return associated.resource.map((r, i) => {
      return(
        <React.Fragment>
          <div key={i}  className="mt-2 ml-3">
            <div>
              <strong><h2>{r.identifier.title} {r.identifier.subtitle}</h2></strong>
            </div>
            <div className="mt-3"><p>{renderHTML(r.introduction)}</p></div>
            <div>
              <table class="content-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Proposed Publication Date</th>  
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {r.syllBooks.map((b, i) => {
                        return(
                          <div className="pt-2 pb-2">{b.title}</div>
                        )
                      })}  
                    </td>
                    <td>{r.syllBooks.map((b, i) => {
                        return(
                          <div className="pt-2 pb-2 text-center">{b.yearPublish}</div>
                        )
                      })} </td>
                    
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3"><p>{renderHTML(r.body)}</p></div>
          </div>
        </React.Fragment>
      )
    })
  }

  const sectionSocial = () => {
    return associated.social.map((s, i) => {
      return(
        <React.Fragment>
          <div key={i}  className="mt-2 ml-3">
            <div>
              <strong><h2>{s.identifier.title} {s.identifier.subtitle}</h2></strong>
            </div>
            <div className="mt-3"><p>{renderHTML(s.introduction)}</p></div>
            <div>
              <strong>Supplementary Resources </strong>             
              <table class="content-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Item Description</th>  
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {s.supplementary.map((b, i) => {
                        return(
                          <div className="pt-2 pb-2">{b.itemNumber}</div>
                        )
                      })}  
                    </td>
                    <td>{s.supplementary.map((b, i) => {
                        return(
                          <div className="pt-2 pb-2">{b.itemName}</div>
                        )
                      })} </td>
                    
                  </tr>
                </tbody>
              </table>
              <div>
                <strong>{s.general.title}</strong><br/>
                {renderHTML(s.general.introduction)}
              </div>
              {/* <div>
              {renderHTML(s.general.introduction)}
              </div> */}
              <div>
                <table class="content-table">
                  <thead>
                    <tr>
                      <th>Items</th>
                      <th>Items</th>  
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {renderHTML(s.general.items1)}  
                      </td>
                      <td>
                      {renderHTML(s.general.items2)}  
                      </td>
                      
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="mt-3"><p>{renderHTML(r.body)}</p></div> */}
          </div>
        </React.Fragment>
      )
    })
  }

  const sectionScienceGeneral = () => {
    return associated.science.map((s, i) => {
      return(
        <React.Fragment>
          <div key={i}  className="mt-2 ml-3">
            <div>
              <strong><h2>{s.identifier.title} {s.identifier.subtitle}</h2></strong>
            </div>
            <div className="mt-3"><p>{renderHTML(s.introduction)}</p></div>
            <div>
              <strong>General Resource Items </strong><br />
              {renderHTML(s.resource1.introduction)}            
              <table class="content-table">
                <thead>
                  <tr>
                    <th>Items</th>
                    <th>Items</th>  
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {renderHTML(s.resource1.items1)}
                    </td>
                    <td>
                      {renderHTML(s.resource1.items2)}
                    </td>
                  </tr>
                </tbody>
              </table>                         
            </div>
          </div>
        </React.Fragment>
      )
    })
  }

  const sectionScienceSpecific = () => {
    return associated.science.map((s, i) => {
      return(
        <React.Fragment>
          <div key={i}  className="mt-2 ml-3">
            
              <strong>Items for each strand</strong>
              {s.resource2.map((b, i) => {
                return(
                  <div >
                    <table class="content-table">
                      <thead>
                        <tr>
                          <th>
                          {`Items for strand - ${b.title}`}
                          </th>  
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {renderHTML(b.body)}
                          </td> 
                        </tr>
                      </tbody>
                    </table>
                  </div>   
                )
              })} 
          </div>
        </React.Fragment>
      )
    })
  }

  const sectionProfile = () => {
    return associated.profile.map((p, i) => {
      return(
        <React.Fragment>
          <div key={i}  className="mt-2 ml-3">
            <div>
                <strong><h2>{p.identifier.title} {p.identifier.subtitle}</h2></strong>
            </div>
            {renderHTML(p.introduction)}
            <table class="content-table">
              <thead>
                <tr>
                  <th>
                  Primary Curriculum Profile: Years 1 - 3
                  </th>
                  <th>
                  
                  </th> 
                  <th>
                  
                  </th>
                  <th>
                  
                  </th>
                  <th>
                  
                  </th>
                  <th>
                  
                  </th>  
                </tr>
              </thead>
              <tbody>
              <tr>
                  
                    <th>
                      Subject
                    </th>
                    
                    <th>
                      Periods per week
                    </th>
                    <th>
                      Minutes per period
                    </th>
                    <th>
                      Minutes per week
                    </th>
                    <th>
                      Hours per week
                    </th>
                    <th>
                      Percentage time per week
                    </th>
                  
                </tr>
                <tr>
                  <td>
                    {p.profile1.map((b, i) => {
                    return(
                        <div>
                          {b.learning_area}
                        </div>
                      )
                    })} 
                  </td>
                  <td>
                    {p.profile1.map((b, i) => {
                    return(
                        <div>
                          {b.periods_week}
                        </div>
                      )
                    })} 
                  </td> 
                  <td>
                    {p.profile1.map((b, i) => {
                    return(
                        <div>
                          {b.minutes_period}
                        </div>
                      )
                    })} 
                  </td> 
                  <td>
                    {p.profile1.map((b, i) => {
                    return(
                        <div>
                          {b.minutes_week}
                        </div>
                      )
                    })} 
                  </td>  
                  <td>
                    {p.profile1.map((b, i) => {
                    return(
                        <div>
                          {b.hours_week}
                        </div>
                      )
                    })} 
                  </td> 
                  <td>
                    {p.profile1.map((b, i) => {
                    return(
                        <div>
                          {b.total_time_week}
                        </div>
                      )
                    })} 
                  </td>              
                </tr>
                
              </tbody>
            </table>
          </div>
          <div className="mt-2 ml-3">
            <table class="content-table">
              <thead>
                <tr>
                  <th>
                  Primary Curriculum Profile: Years 4 - 6
                  </th> 
                  <th>
                  
                  </th> 
                  <th>
                  
                  </th>
                  <th>
                  
                  </th>
                  <th>
                  
                  </th>
                  <th>
                  
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <th>
                      Subject
                    </th>
                    
                    <th>
                      Periods per week
                    </th>
                    <th>
                      Minutes per period
                    </th>
                    <th>
                      Minutes per week
                    </th>
                    <th>
                      Hours per week
                    </th>
                    <th>
                      Percentage time per week
                    </th>
                </tr>

                <tr>
                  <td>
                    {p.profile2.map((b, i) => {
                    return(
                        <div>
                          {b.learning_area}
                        </div>
                      )
                    })} 
                  </td>
                  <td>
                    {p.profile2.map((b, i) => {
                    return(
                        <div>
                          {b.periods_week}
                        </div>
                      )
                    })} 
                  </td> 
                  <td>
                    {p.profile2.map((b, i) => {
                    return(
                        <div>
                          {b.minutes_period}
                        </div>
                      )
                    })} 
                  </td> 
                  <td>
                    {p.profile2.map((b, i) => {
                    return(
                        <div>
                          {b.minutes_week}
                        </div>
                      )
                    })} 
                  </td>  
                  <td>
                    {p.profile2.map((b, i) => {
                    return(
                        <div>
                          {b.hours_week}
                        </div>
                      )
                    })} 
                  </td> 
                  <td>
                    {p.profile2.map((b, i) => {
                    return(
                        <div>
                          {b.total_time_week}
                        </div>
                      )
                    })} 
                  </td>              
                </tr>
                
                
              </tbody>
            </table>
            <div>
              {renderHTML(p.body)}
            </div>
          </div>
          
        </React.Fragment>
      )
    })
  }

  const sectionProcessesPsc = () => {
    return associated.processes.map((p, i) => {
      return(
        <React.Fragment>
          <div key={i}  className="mt-2 ml-3">
          <div>
              <strong><h2>{p.identifier.title} {p.identifier.subtitle}</h2></strong>
            </div>
            {renderHTML(p.introduction)}
            <table class="content-table">
              <thead>
                <tr>
                <th>
                  {
                  p.headings.map((s, i)=>{
                    return(
                      <div>
                        {s.year}
                      </div>
                    )
                  })
                  }  
                </th>
                <th>
                  {
                  p.headings.map((s, i)=>{
                    return(
                      <div>
                        {renderHTML(s.planning)}
                      </div>
                    )
                  })
                  }  
                </th>
                <th>
                  {
                  p.headings.map((s, i)=>{
                    return(
                      <div>
                        {renderHTML(s.conducting)}
                      </div>
                    )
                  })
                  }  
                </th>
                <th>
                  {
                  p.headings.map((s, i)=>{
                    return(
                      <div>
                        {renderHTML(s.processing)}
                      </div>
                    )
                  })
                  }  
                </th>
                <th>
                  {
                  p.headings.map((s, i)=>{
                    return(
                      <div>
                        {renderHTML(s.evaluating)}
                      </div>
                    )
                  })
                  }  
                </th>
                <th>
                  {
                  p.headings.map((s, i)=>{
                    return(
                      <div>
                        {renderHTML(s.communication)}
                      </div>
                    )
                  })
                  }  
                </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                  {
                  p.skills.map((s, i)=>{
                    return(
                      <div>
                        {s.year}
                      </div> 
                    )
                  })
                  }
                  </td> 
                  <td>
                  {
                  p.skills.map((s, i)=>{
                    return(
                      <div>
                        {renderHTML(s.planning)}
                      </div> 
                    )
                  })
                  }
                  </td> 
                  <td>
                  {
                  p.skills.map((s, i)=>{
                    return(
                      <div>
                        {renderHTML(s.conducting)}
                      </div> 
                    )
                  })
                  }
                  </td> 
                  <td>
                  {
                  p.skills.map((s, i)=>{
                    return(
                      <div>
                        {renderHTML(s.processing)}
                      </div> 
                    )
                  })
                  }
                  </td>
                  <td>
                  {
                  p.skills.map((s, i)=>{
                    return(
                      <div>
                        {renderHTML(s.evaluating)}
                      </div> 
                    )
                  })
                  }
                  </td>
                  <td>
                  {
                  p.skills.map((s, i)=>{
                    return(
                      <div>
                        {renderHTML(s.communication)}
                      </div> 
                    )
                  })
                  }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </React.Fragment>
      )
    })
  }

  const sectionProcessesPss = () => {
    return associated.processesPss.map((p, i) => {
      return(
        <React.Fragment>
          <div key={i}  className="mt-2 ml-3">
          <div>
              <strong><h2>{p.identifier.title} {p.identifier.subtitle}</h2></strong>
            </div>
            {renderHTML(p.introduction)}
            <table class="content-table">
              <thead>
                <tr>
                  <th>
                    {
                    p.headings.map((h, i)=>{
                      return(
                        <div>
                          {h.year}
                        </div>
                      )
                    })
                    }  
                  </th>
                  <th>
                    {
                    p.headings.map((h, i)=>{
                      return(
                        <div>
                          {renderHTML(h.making)}
                        </div>
                      )
                    })
                    }  
                  </th>
                  <th>
                    {
                    p.headings.map((h, i)=>{
                      return(
                        <div>
                          {renderHTML(h.reflecting)}
                        </div>
                      )
                    })
                    }  
                  </th>
                  <th>
                    {
                    p.headings.map((h, i)=>{
                      return(
                        <div>
                          {renderHTML(h.processing)}
                        </div>
                      )
                    })
                    }  
                  </th>
                  <th>
                    {
                    p.headings.map((h, i)=>{
                      return(
                        <div>
                          {renderHTML(h.understanding)}
                        </div>
                      )
                    })
                    }  
                  </th>
                  <th>
                    {
                    p.headings.map((h, i)=>{
                      return(
                        <div>
                          {renderHTML(h.strategies)}
                        </div>
                      )
                    })
                    }  
                  </th>
                  <th>
                    {
                    p.headings.map((h, i)=>{
                      return(
                        <div>
                          {renderHTML(h.exploring)}
                        </div>
                      )
                    })
                    }  
                  </th>
                  <th>
                    {
                    p.headings.map((h, i)=>{
                      return(
                        <div>
                          {renderHTML(h.participation)}
                        </div>
                      )
                    })
                    }  
                  </th>
                </tr>
              </thead>
              <tbody>
              <tr>
                
                </tr>
                <tr>
                  <td>
                  {
                  p.skills.map((s, i)=>{
                    return(
                      <div>
                        {s.year}
                      </div> 
                    )
                  })
                  }
                  </td> 
                  <td>
                  {
                  p.skills.map((s, i)=>{
                    return(
                      <div>
                        {renderHTML(s.making)}
                      </div> 
                    )
                  })
                  }
                  </td> 
                  <td>
                  {
                  p.skills.map((s, i)=>{
                    return(
                      <div>
                        {renderHTML(s.reflecting)}
                      </div> 
                    )
                  })
                  }
                  </td> 
                  <td>
                  {
                  p.skills.map((s, i)=>{
                    return(
                      <div>
                        {renderHTML(s.processing)}
                      </div> 
                    )
                  })
                  }
                  </td> 
                  <td>
                  {
                  p.skills.map((s, i)=>{
                    return(
                      <div>
                        {renderHTML(s.understanding)}
                      </div> 
                    )
                  })
                  }
                  </td> 
                  <td>
                  {
                  p.skills.map((s, i)=>{
                    return(
                      <div>
                        {renderHTML(s.strategies)}
                      </div> 
                    )
                  })
                  }
                  </td> 
                  <td>
                  {
                  p.skills.map((s, i)=>{
                    return(
                      <div>
                        {renderHTML(s.exploring)}
                      </div> 
                    )
                  })
                  }
                  </td> 
                  <td>
                  {
                  p.skills.map((s, i)=>{
                    return(
                      <div>
                        {renderHTML(s.participation)}
                      </div> 
                    )
                  })
                  }
                  </td> 
                </tr>
              </tbody>
            </table>
          </div>
          
        </React.Fragment>
      )
    })
  }

  const sectionTeachingLearningPsc = () => {
    return associated.learningPsc.map((p, i) => {
      return(
        <React.Fragment>
          <div key={i}  className="mt-2 ml-3">
            <div>
                <strong><h2>{p.identifier.title} {p.identifier.subtitle}</h2></strong>
            </div>
            {renderHTML(p.introduction)}
            <div>
              <h6><strong>{p.approaches.heading1}</strong></h6>
              {renderHTML(p.approaches.introduction)}
            </div>
            <div><h8><strong>{p.approaches.heading2}</strong></h8></div>
            <div>{renderHTML(p.approaches.body)}</div>
            <h6><strong>{renderHTML(p.link_title)}</strong></h6>
            <div>
            <table class="content-table">
              <thead>
                <tr>
                  <th>
                   Subject
                  </th>
                                  
                </tr>
              </thead>
              <tbody>
                <tr>
                {
                  p.links.learningAreas.map((l, i)=> {
                   return(
                     <tr>
                       <td>
                        <div>
                        {l.subtitle}
                        </div>
                       </td>
                       <td>
                        <div>
                        {renderHTML(l.body)}
                        </div>
                       </td>
                    </tr>
                   )
                  })
                }
                </tr>
              </tbody>
            </table>
            </div>
            <div>{renderHTML(p.links.body)}</div>
            <div> 
              <h6><strong> {renderHTML(p.issues.subtitle)}</strong></h6>
            </div>
            <div> 
              {renderHTML(p.issues.body)}
            </div>
            <div> 
              <h6><strong> {renderHTML(p.monitoring.subtitle)}</strong></h6>
            </div>
            <div>{renderHTML(p.monitoring.introduction)}</div>
            <div>
            <table class="content-table">
                <thead>
                  <tr>
                    <th>
                      Type of Assessment
                    </th>
                    <th>
                      Strategy
                    </th>             
                  </tr>
                </thead>
                <tbody>
                  
                    {p.monitoring.table.map((t, i) => {
                      return(
                        <React.Fragment>
                          <tr>
                            <td>{t.type}</td>
                            <td>{renderHTML(t.strategy)}</td>
                          </tr>
                        </React.Fragment>
                      )
                    })}
                  
                </tbody>
            </table>
            </div>
            <div>{renderHTML(p.monitoring.body)}</div>
          </div>
          <div>
            <table class="content-table">
                <thead>
                  <tr>
                    <th>
                    </th>
                    <th>
                    </th>
                    <th>
                      TERM 1
                    </th>
                    <th>
                    </th>
                    <th>
                    </th>
                    <th>
                      TERM 2
                    </th>
                    <th>
                    </th>
                    <th>
                    </th>
                    <th>
                      TERM 3
                    </th> 
                    <th>
                    </th>
                    <th>
                    </th>
                    <th>
                      TERM 4
                    </th>
                    <th>
                    </th>               
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>STRAND</td>
                    <td>LL</td>
                    <td>LL</td>
                    <td></td>
                    <td>EC</td>
                    <td>EC</td>
                    <td></td>
                    <td>NPM</td>
                    <td>EC</td>
                    <td></td>
                    <td>F</td>
                    <td>EB</td>
                    <td></td>
                  </tr>
                  <tr>
                  <td>Assessment Event</td>
                    <td>Plan, carry out and record a seed germination investigation</td>
                    <td>In the first column of a table, list five of your daily activities. Show with an X the system that enables you to do that activity </td>
                    <td>End Term Test ( out of 20 ) </td>
                    <td>Label different types of energy on an energy conversion chain </td>
                    <td>Indicate what happens when pairs of magnets with like poles/unlike poles face each other </td>
                    <td>End Term Test ( out of 20 ) </td>
                    <td>Copy and complete the table by filling in Yes or No, to say whether substances form solutions </td>
                    <td>Write True or False beside each of the following statements about Sound, as a form of energy </td>
                    <td>End Term Test ( out of 20 ) </td>
                    <td>For each member of each group, award a grade for each activity in the gardening project. </td>
                    <td>Complete the passage about Earth, by filling in the blanks.</td>
                    <td>End Term Test ( out of 20 )</td>
                  </tr>
                  <tr>
                    <td>NAMES</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Nancy</td>
                    <td>A</td>
                    <td>PA2</td>
                    <td>15</td>
                    <td>A</td>
                    <td>A</td>
                    <td>16</td>
                    <td>A</td>
                    <td>PA4</td>
                    <td>18</td>
                    <td>PA3</td>
                    <td>A</td>
                    <td>18</td>
                  </tr>
                  <tr>
                    <td>Linda</td>
                    <td>A</td>
                    <td>PA1</td>
                    <td>14</td>
                    <td>A</td>
                    <td>A</td>
                    <td>16</td>
                    <td>A</td>
                    <td>PA</td>
                    <td>17</td>
                    <td>PA2</td>
                    <td>A</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>Caroline</td>
                    <td>PA2</td>
                    <td>PA2</td>
                    <td>15</td>
                    <td>A</td>
                    <td>PA2</td>
                    <td>17</td>
                    <td>A</td>
                    <td>PA2</td>
                    <td>18</td>
                    <td>PA1</td>
                    <td>A</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>Robert</td>
                    <td>PA4</td>
                    <td>PA2</td>
                    <td>17</td>
                    <td>NA</td>
                    <td>PA3</td>
                    <td>16</td>
                    <td>A</td>
                    <td>PA3</td>
                    <td>17</td>
                    <td>PA1</td>
                    <td>A</td>
                    <td>18</td>
                  </tr>
                </tbody>
            </table>
          </div>
          <div>
            <strong>Key:</strong><br />
            A = LO Achieved<br/>  PA = LO partially achieved (PA1 - 4)<br/>    NA = LO not achieved
          </div>
        </React.Fragment>
      )
    })
  }

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <section className="syllabus-wrapper">         
            <div className="syllabus-head">
              <SyllabusHero syllabus={syllabus} />
            </div>
          </section>

          <section>
            <div className="core-container">
              <div className="sidebar-wrapper"> 
                <Sidebar 
                  syllabus={syllabus} 
                  handleFilters={filters => handleFilters(filters)}
                  sectionSyllabus={sectionSyllabus}
                />
              </div>
                <div className="main-content-wrapper">
                  <div className="ml-3">
                    <div className="main-content-wrapper">
                      <div className="instruction-wrapper" style={{display: "flex"}}>
                        <div className="instruction-holder"> 
                            {/* <span onClick={() => toggleDisplayContent(!displayContent)} style={{border: "none"}}>
                              <strong>{showAllYears()}</strong>
                            </span> */}
                        </div>
                      </div>
                      <div className="substrand-content-wrapper">
                        <div className="substrand-content-title"> 
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
                  {/* <div className="mt-3 ml-3"><strong><h2>{associated.section.title} {associated.section.subtitle}</h2></strong></div> */}
                </div>
                <div className="mt-3 ml-3">
                                        
                      {associated.foreword ? foreword() : null}
                      {associated.acknowledgement ? acknowledgement() : null}
                      {associated.introduction ? sectionIntroduction() : null}
                      {associated.rationale ? sectionRationale() : null}
                      {associated.aim ? sectionAim() : null}
                      {associated.strand ? <React.Fragment>
                        {/* <div className="mt-3 ml-3"><strong><h2>{associated.section.title} {associated.section.subtitle}</h2></strong></div> */}
                        <div>{sectionStrand()}</div>
                      </React.Fragment> : null}
                      {associated.structure ? sectionStructure() : null}
                      {associated.profile ? sectionProfile() : null}
                      {associated.assessment ? sectionAssessment() : null}
                      {associated.reference ? sectionReference() : null}
                      {associated.resource ? sectionResource(): null}
                      {associated.glossary ? sectionGlossary(): null}
                      {associated.contribution ? sectionContribution(): null}
                      {associated.social ? sectionSocial(): null}
                      {associated.science ? sectionScienceGeneral(): null}
                      {associated.science ? sectionScienceSpecific(): null}
                      {associated.processes ? sectionProcessesPsc(): null}
                      {associated.processesPss ? sectionProcessesPss(): null}
                      {associated.learningPsc ? sectionTeachingLearningPsc(): null}
                      

                </div>
                
                <div className="mt-5 ml-3">
                  {/* {JSON.stringify(associated)} */}
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </React.Fragment>
  );
};

SingleSyllabus.getInitialProps = ({ query }) => {
  return singleSyllabus(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        // syllabus: data.query,
        syllabus: data.syllabus,
      };
    }
  });
};

export default withRouter(SingleSyllabus);
