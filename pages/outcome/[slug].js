import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import renderHTML from "react-render-html";
import moment from "moment";
import { FaChevronCircleLeft } from "react-icons/fa";
import { Jumbotron } from "reactstrap";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
// import { UncontrolledDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import Layout from "../../components/Layout";
import OutcomeCarousal from "../../components/common/carousels/OutcomeCarousal";
import NoteModal from "../../components/modals/NoteUpdateModal";
import OutcomeTabs from "../../components/common/tabs/Outcometabs";

import { singleCategory, getCategories} from "../../actions/category";
import { singleOutcome, listRelatedOutcomes, getYearSubstrands } from "../../actions/outcome";
import { getNotes, createNotes, removeNote } from "../../actions/note";
import Private from "../../components/auth/Private";
import { isAuth, getCookie } from "../../actions/auth";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

//Rich editor for creating strand statement
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);


const Outcome = ({ outcome, subject, router }) => {
  const head = () => (
    <Head>
      <title>
        {`${showSubstrand()}`} | {APP_NAME}
      </title>
      <meta
        name="description"
        content={`${showSubstrandTitle()} for ${outcome.subject.name}`}
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`${showSubstrandTitle()} | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content={`${showSubstrandTitle()} for ${outcome.subject.name}`}
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
 
  const [categorySyllabus, setCategorySyllabus] = useState([]);
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
    initCategories()
    loadRelated();
  }, []);

  // const showAllCategories = () => {
  //   return allCategories.map((category, i) => (
  //     <React.Fragment>
  //       <Link href="/categories/[slug]" as={`/categories/${category.slug}`} key={i}>
  //         <a className="btn font-weight-bold mr-1 ml-1 mt-3">{category.name}</a>
  //       </Link>
        
  //     </React.Fragment>
  //   ));
  // }
  const categoryContent = (slug) => {
    singleCategory(slug).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategorySyllabus(data);
      }
    });
  }

  const categoryOutcome = () => {
    return categorySyllabus.map((syllabus, i) => (
          <React.Fragment key={i}>
            {/* <Link href="/syllabus/[slug]" as={`/syllabus/${syllabus.slug}`} key={i}>
              <a>{syllabus.name}</a>
            </Link> */}
            
              <DropdownItem>
                <Link href="/syllabus/[slug]" as={`/syllabus/${syllabus.slug}`} >
                  <a>{syllabus.name}</a>
                </Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            
          </React.Fragment>
        ));
  }

  const showAllCategories = () => {
    // const [dropdownOpen, setOpen] = useState(false);
    // const toggle = () => setOpen(!dropdownOpen);

    return allCategories.map((category, i) => (
      
        <Link key={i} href="/categories/[slug]" as={`/categories/${category.slug}`}>
          <a className="metabox__category-home-link" style={{letterSpacing: "1px"}}><i className="fa fa-home" aria-hidden="true"></i>{category.name}</a>
        </Link>
        
    

    ));
    }

    

  const loadRelated = () => {
    listRelatedOutcomes({ outcome }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  //*****For the note taking part of this component*******
  const bodyFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("note")) {
      //data was save in ls; use the JSON.parse method to convert it into js object
      return JSON.parse(localStorage.getItem("note"));
    } else {
      return false;
    }
  };
  const [values, setValues] = useState({
    error: "",
    success: "",
    title: "",
    formData: "",
  });

  const { error, success, title, formData } = values;

  const [body, setBody] = useState(bodyFromLS());
  const [myNotes, setMyNotes] = useState([]);
  const [message, setMessage] = useState("");
  const [substrandContent, setSubstrandContent] = useState([]);

  // const { notes } = myNotes;
  const userId = isAuth() && isAuth().id;
  const token = getCookie("token");

  const loadNotes = () => {
    getNotes(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMyNotes(data);
      }
    });
  };

  const deleteNote = (slug) => {
    removeNote(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadNotes();
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are your sure you want to delete this note");
    if (answer) {
      deleteNote(slug);
    }
  };

  const loadMyNotes = () => {
    return myNotes.map((note, i) => {
      return (
        <div className="mb-3" key={i}>
          <Card>
            <CardBody>
              <CardTitle>
                <strong>{note.title}</strong>
              </CardTitle>
              <CardText>{renderHTML(note.body)}</CardText>
              <CardText>
                <div className="container">
                  <div className="row">
                    <div className="col-md-4 text-center">
                      <button
                        className="btn btn-sm btn-danger mb-3 text-center pt-2 pb-2"
                        onClick={() => deleteConfirm(note.slug)}
                      >
                        DELETE
                      </button>
                    </div>
                    <div className="col-md-8">
                      <NoteModal slug={note.slug} />
                    </div>
                  </div>
                </div>

                <p className="mark text-muted text-center">
                  Written by {note.createdBy.name} | Created{" "}
                  {moment(note.createdAt).fromNow()}
                </p>
              </CardText>
            </CardBody>
          </Card>
        </div>
      );
    });
  };

  const publishNote = (e) => {
    e.preventDefault();
    createNotes(formData, userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          error: "",
          title: "",
          success: "Your note was created",
        });

        setBody("");
        loadNotes();
      }
    });
  };

  //****Note taking*******
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    loadNotes();
    loadRelated();
  }, []);

  const showRelatedOutcomes = () => {
    return related.map((outcome, i) => {
      return (
        <article key={i}>
          <Link href="/outcome/[slug]" as={`/outcome/${outcome.slug}`}>
            <a>{renderHTML(outcome.general)}</a>
          </Link>
        </article>
      );
    });
  };

  const showSpecificOutcome = () => {
    return outcome.indicators.map((indicator, i) => {
      return (
        <article key={i}>
          <div className="container">{renderHTML(indicator.specific)}</div>
        </article>
      );
    });
  };

  const showOutcomeActivity = () => {
    return outcome.indicators.map((indicator, i) => {
      return <article key={i}>{renderHTML(indicator.activity)}</article>;
    });
  };

  const showStrandTitle = () => {
    return outcome.strand.map((s, i) => {
      return (
        // <article key={i}>
        //   <Link href="/strand/[slug]" as={`/strand/${s.slug}`}>
        //     <a>
        //       <FaChevronCircleLeft /> {s.title}
        //     </a>
        //   </Link>
        // </article>
        <div key={i}>
        
         
            {s.title}
         
      </div>
      );
    });
  };

  // const showSubject = () => {
  //   return outcome.map((s, i) => {
  //     return (
  //       <article key={i}>
  //         <Link href="/syllabus/[slug]" as={`/syllabus/${s.slug}`}>
  //           <a>
  //             <FaChevronCircleLeft /> {s.name}
  //           </a>
  //         </Link>
  //       </article>
  //     );
  //   });
  // };

  const showSubstrand = () => {
    return outcome.substrand.map((s, i) => {
      return (
        <article key={i}>
          <Link href="/substrand/[slug]" as={`/substrand/${s.slug}`}>
            <a>
              <FaChevronCircleLeft /> {s.title}
            </a>
          </Link>
        </article>
      );
    });
  };

  const yearContent = (slug) => {
    getYearSubstrands(slug, {outcome}).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        //push json data into a state
        setSubstrandContent(data);
      }
    });
  }
  
  const filteredContent = () => {
    return substrandContent.map((s, i) => {
      return (
        <div key={i} className="mb-3">
          <Link href="/substrand/[slug]" as={`/substrand/${s.slug}`}>
            <a>
              <FaChevronCircleLeft /> {s.title}
            </a>
          </Link>
        </div>
      );
    });
  };

  const showAllYears = () => {
    return outcome.strand.map((s, i) => {
      return (
        <article key={i}>
          {s.years.map((year, i) => {
            return (
              <Button
                variant="contained" 
                color="primary"
                onClick={() => yearContent(year.slug)}
                className="btn btn-primary font-weight-bold mr-3"
              >
                Year {year.name}
              </Button>
            );
          })}
        </article>
      );
    });
  };

  
  const handleChange = (name) => (e) => {
    const value = e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "", success: "" });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
    formData.set("outcome", `${outcome._id}`);
    //Store and populate the data in localstorage in the event of any anneccesary change
    if (typeof window !== "undefined") {
      localStorage.setItem("body", JSON.stringify(e));
    }
  };

  const createNoteForm = () => {
    return (
      <form onSubmit={publishNote}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Title for your note"
            value={title}
            onChange={handleChange("title")}
          />
        </div>

        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder="Enter your notes here"
            onChange={handleBody}
          />
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    );
  };

  const loadAllSyllabusButton = () => {
    return (
        <div className="font-weight-bold mt-4">
          <Link  href={`/syllabus`}>
            <a className="btn btn-primary "><strong>All Syllabuses</strong></a>
          </Link>
        </div>
    );
  };

  return (
    <React.Fragment>
      {/* {head()} */}
      <Layout>
        <Private>
          <main>  
            
            {/* <section className="head-section"> 
              <div className="page-banner">
               <div className="page-banner__bg-image-substrand">
                 <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop" id="herovideo">
                       <source src="../../static/videos/video_3.mp4" type="video/mp4"/>
                 </video> 
               </div>    
               <div className="page-banner__content container container--narrow">
                  <h1 className="page-banner__title">{outcome.subject.name}</h1>
                  <div className="page-banner__intro">
                      <p>This is the {outcome.subject.name} published and is now available in <br />Solomon Islands Schools.
                        This page contains the specific learning outcomes, <br />its associated activity, personal notes and formative assessment outcome. <br /> Other learning outcomes are also given and are clickable. {loadAllSyllabusButton()}</p>
                  </div>
                </div> 
              
              </div>
              
              <div className="container" style={{marginTop:"-20px"}}>
                <div className="text-center">
                  {showAllCategories()}
                </div>
              </div>
            </section>
           
            <div className="container-fluid">
              <div className="row">
                <div
                  className="col-md-3"
                  style={{
                    backgroundColor: "#eee",
                    marginLeft: "-3px",
                    border: "3px solid #ccc",
                    marginBottom: "30px",
                  }}
                >
                  <div className="container">
                    <div className="mt-4">
                      <p>
                        All outcomes of this substrand
                      </p>
                      <div>{showRelatedOutcomes()}</div>
                    </div>
                  </div>
                </div>

                <div className="col-md-9" >
                  
                  <div className="container">
                    <div
                      style={{
                        backgroundColor: "rgba(255, 299, 100, 0.2)",
                        borderLeft: "5px solid #ffe564",
                        height: "500px"  
                      }}
                    >
                    <div className="text-center pl-3 pt-4"><strong>Note:</strong>The buttons below contains all the substrands in each year level. Click to view.</div>
                    <div className="text-center pt-4 pb-4">
                      <span onClick={() => toggleDisplayContent(!displayContent)} style={{border: "none"}}>
                          <strong>{showAllYears()}</strong> 
                      </span>
                    </div>
                    
                    
                    <div className="row">
                      <div className="col-md-4">
                        <div
                          style={{
                            paddingLeft: "8%",
                            paddingTop: "5%"
                          }}
                        >
                          {/* {displayContent && <React.Fragment><div className="pb-5"
                            >{filteredContent()}</div></React.Fragment>} */}
                          
                            {/* {filteredContent()}
                        </div>
                      </div>
                      <div className="col-md-8">
                          <div className="row">
                            <figure className="col-md-6" style={{height: "350px", width: "15px"}}>
                                <img className="outcome-image-1" src="../../static/images/students_dancing.jpg" alt="Parade before sports"/>
                                <figcaption className="caption">
                                  &copy; St. Nicholas students performing
                                </figcaption>

                            </figure>
                            
                            <figure className="col-md-6">
                              <img className="outcome-image-2" src="../../static/images/students_drawing.jpg" alt="Connecting rubbers"/>
                              <figcaption className="caption">
                                &copy; St. Nicholas ECE students learning
                              </figcaption>
                            </figure>
                  
                          </div>
                      </div>
                    </div> */}
{/*                   
                  </div>
                    <div className="col-md-12">
                      <h5 className="font-weight-bold mt-4">
                        {showStrandTitle()}
                      </h5>
                    </div>
                    <div className="col-md-12" style={{ marginTop: "1em" }}>
                      <strong>YEAR {outcome.year.name}</strong>
                    </div>
                    <div class="col-md-12" style={{ marginTop: "1em" }}>
                      <strong>Substrand:</strong> {showSubstrand()}
                    </div>
                    <hr />
                  </div>
                  <div className="container mb-2">
                    <div className="row">
                      <div className="col-md-5">
                        <div class="col-md-12">
                          <strong>General Learning Outcome</strong>
                        </div>
                        <div class="col-md-12">
                          {renderHTML(outcome.general)}
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div class="col-md-12">
                          <strong>Specific Learning Outcome(s)</strong>
                        </div>
                        <div>{showSpecificOutcome()}</div>
                      </div>
                    </div>
                    <hr />
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="font-weight-bold mb-2">
                            Learner activity
                          </div>
                          {showOutcomeActivity()}
                        </div>
                        <div className="container">
                          <div className="row">
                            <div className="col-md-12 mt-3 mb-3">
                              <p className="font-weight-bold">My Note</p>
                              {createNoteForm()}
                            </div>
                            <div className="col-md-12 mt-3 mb-3">
                              {message && (
                                <div className="alert alert-warning">
                                  {message}
                                </div>
                              )}
                            </div>
                            <div class="col-md-12">{loadMyNotes()}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="container">
                      <div className="row">
                        <div className="mt-3">
                          <OutcomeTabs outcome={outcome} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              
              
              
              </div>
            </div> */} 
            {/* {JSON.stringify(outcome)} */}
          </main>
        </Private>
      </Layout>
    </React.Fragment>
  );
};

Outcome.getInitialProps = ({ query }) => {
  return singleOutcome(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        outcome: data.outcome,
        subject: data.subject,
        strand: data.strand,
        substrand: data.substrand,
      };
    }
  });
};

export default withRouter(Outcome);
