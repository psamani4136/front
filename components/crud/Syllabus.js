import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";   

import { isAuth, getCookie } from "../../actions/auth";
import { getStrands } from "../../actions/strand";
import { getYears } from "../../actions/year";
import { getAims } from "../../actions/aim";
import { getIntroductions } from "../../actions/introduction";
import { getRationales } from "../../actions/rationale";
import { getCategories } from "../../actions/category";
import { getSubjects } from "../../actions/subject";
import { createSyllabus, getFilteredStrands } from "../../actions/syllabus";
import Checkbox from "../subjectFilter/CheckBox";

//Rich editor for creating syllabus core details
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";

const Syllabus = ({ router }) => {
  /****FILTER STATE FOR STRAND USING SUBJECT AS THE SOURCE OF FILTER******/
  const [myFilters, setMyFilters] = useState({
    filters: { subject: [] },
  });
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  /****END OF FILTER STATE******/

  const [aims, setAims] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [excerpt, setExcerpt] = useState([]);
  const [introductions, setIntroductions] = useState([]);
  const [rationales, setRationales] = useState([]);
  //const [strands, setStrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);
  //const [checkedAims, setCheckedAims] = useState([]); // aims checking
  // const [checkedCategories, setCheckedCategories] = useState([]); // strands checking
  const [checkedStrands, setCheckedStrands] = useState([]); // strands checking
  const [checkedYear, setCheckedYear] = useState([]); // years checking
  const [checked, setChecked] = useState([]);

  const [values, setValues] = useState({
    error: "",
    success: "",
    formData: "",
    years: "",
    aim: "",
    subject: "",
    description: "",
    name: "",
    category: "",
    introduction: "",
    rationale: "",
    title: "",
    hidePublishButton: false,
  });

  const {
    error,
    success,
    formData,
    subject,
    description,
    name,
    introduction,
    aim,
    category,
    rationale,
    hidePublishButton,
  } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    //initStrands();
    initCategories();
    initAims();
    initIntroductions();
    initRationales();
    initSubjects();
    initYears();
  }, [router]);

  //Get the substrands and years from database and push them into their respective states throught the useEffect hook
  /*+++++++++++++++++++++++++START OF STATE INITIALISATION++++++++++++++++++++++++++++*/
  // const initStrands = () => {
  //   getStrands().then((data) => {
  //     if (data.error) {
  //       setValues({ ...values, error: data.error });
  //     } else {
  //       setStrands(data);
  //     }
  //   });
  // };

  const initYears = () => {
    getYears().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setYears(data);
      }
    });
  };

  const showYears = () => {
    return (
      years &&
      years.map((y, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleToggleYears(y._id)} //push only the year id into the state
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{y.name}</label>
        </li>
      ))
    );
  };

  const handleToggleYears = (y) => () => {
    setValues({ ...values, error: "" });
    // return the first index or -1
    const clickedYear = checkedYear.indexOf(y);
    const all = [...checkedYear];

    if (clickedYear === -1) {
      all.push(y);
    } else {
      all.splice(clickedYear, 1);
    }
    //console.log(all);
    setCheckedYear(all);
    formData.set("years", all);
  };

  const initSubjects = () => {
    getSubjects().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setSubjects(data);
      }
    });
  };

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initAims = () => {
    getAims().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setAims(data);
      }
    });
  };

  const initIntroductions = () => {
    getIntroductions().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setIntroductions(data);
      }
    });
  };

  const initRationales = () => {
    getRationales().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setRationales(data);
      }
    });
  };

  /*+++++++++++++++++++END OF STATE INITIALISATION++++++++++++++++++++++++++++*/

  const token = getCookie("token");
  const publishSyllabus = (e) => {
    e.preventDefault();
    createSyllabus(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          description: "",
          excerpt: "",
          name: "",
          error: "",
          success: `Congratulations, you have just created a new syllabus`,
        });
        //setStrands([]);
        setIntroductions([]);
        setRationales([]);
        setExcerpt([]);
        setAims([]);
        setCategories([]);
        setChecked([]);
        setSubjects([]);
        setCheckedStrands([]);
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "", success: "" });
  };

  const handleExcerpt = (e) => {
    setExcerpt(e);
    formData.set("excerpt", e);
  };

  //onChange functions for the strands option checkbox
  const handleToggleStrands = (s) => () => {
    setValues({ ...values, error: "" });
    // return the first index or -1
    const clickedStrand = checkedStrands.indexOf(s);
    const all = [...checkedStrands];

    if (clickedStrand === -1) {
      all.push(s);
    } else {
      all.splice(clickedStrand, 1);
    }
    console.log(all);
    setCheckedStrands(all);
    formData.set("strands", all);
  };

  /*****Filter methods - filter for strands using syllabus as the argument******/
  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const loadFilteredResults = (newFilters) => {
    getFilteredStrands(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  /********************************END OF FILTER METHODS************************/

  const createSyllabusForm = () => {
    return (
      <form onSubmit={publishSyllabus}>
        <div className="form-group">
          <select onChange={handleChange("subject")} className="form-control">
            <option>Please Select A Title</option>
            {subjects &&
              subjects.map((s, i) => (
                <option key={i} value={s._id}>
                  {s.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <select onChange={handleChange("aim")} className="form-control">
            <option>Please Select The Aim</option>
            {aims &&
              aims.map((a, i) => (
                <option key={i} value={a._id}>
                  {a.aim}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <select
            onChange={handleChange("introduction")}
            className="form-control"
          >
            <option>Please Select The Introduction</option>
            {introductions &&
              introductions.map((introduction, i) => (
                <option key={i} value={introduction._id}>
                  {introduction.introduction}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <select onChange={handleChange("rationale")} className="form-control">
            <option>Please Select The Rationale</option>
            {rationales &&
              rationales.map((r, i) => (
                <option key={i} value={r._id}>
                  {r.rationale}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <select onChange={handleChange("category")} className="form-control">
            <option>Please Select A Category</option>
            {categories &&
              categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Insert syllabus description here"
            value={description}
            onChange={handleChange("description")}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Insert syllabus name here"
            value={name}
            onChange={handleChange("name")}
          />
        </div>
        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={excerpt}
            placeholder="Enter the syllabus excerpt here"
            onChange={handleExcerpt}
          />
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div>
          {showError()}
          {showSuccess()}
        </div>
        <div className="row">
          <div className="col-md-7">{createSyllabusForm()}</div>
          <div className="col-md-5" style={{ backgroundColor: "#ebe9e9" }}>
  <div className="pt-2 pd-2">Check all years <hr/>{showYears()}</div>
            <div className="mt-2 pb-2">
              Filter strands by syllabus
              <hr />
              <ul>
                <Checkbox
                  subjects={subjects}
                  handleFilters={(filters) => handleFilters(filters, "subject")}
                />
              </ul>
              <hr />
              {/*Filtered Results function*/}
              {filteredResults.map((s, i) => {
                return (
                  <div key={i}>
                    <li className="list-unstyled">
                      <input
                        onChange={handleToggleStrands(s._id)} //push only the strand id into the state
                        value={s._id}
                        type="checkbox"
                        className="mr-2"
                      />
                      <label className="form-check-label">{s.title}</label>
                    </li>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Syllabus);
