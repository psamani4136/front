import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";

import { isAuth, getCookie } from "../../actions/auth";
import { getSubstrands } from "../../actions/substrand";
import { getYears } from "../../actions/year";
import { getSubjects } from "../../actions/subject";
import { createStrand, getFilteredSubstrands } from "../../actions/strand";
import Checkbox from "../subjectFilter/CheckBox";

//Rich editor for creating strand statement
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";

const Strand = ({ router }) => {
  const statementFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("statement")) {
      //data was save in ls; use the JSON.parse method to convert it into js object
      return JSON.parse(localStorage.getItem("statement"));
    } else {
      return false;
    }
  };

  /****FILTER STATE FOR STRAND USING SUBJECT AS THE SOURCE OF FILTER******/
  const [myFilters, setMyFilters] = useState({
    filters: { subject: [] },
  });
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  /****END OF FILTER STATE******/

  const [statement, setStatement] = useState(statementFromLS());
  const [checkedSubstrand, setCheckedSubstrand] = useState([]); // substrands checking
  const [checkedYear, setCheckedYear] = useState([]); // years checking

  const [years, setYears] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [substrands, setSubstrands] = useState([]);
  const [values, setValues] = useState({
    error: "",
    success: "",
    formData: "",
    subject: "",
    title: "",
    hidePublishButton: false,
  });

  const {
    error,
    success,
    formData,
    subject,
    title,
    hidePublishButton,
  } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    // initSubstrands();
    initYears();
    initSubjects();
  }, [router]);

  //Get the substrands and years from database and push them into their respective states throught the useEffect hook
  /*+++++++++++++++++++++++++START OF STATE INITIALISATION++++++++++++++++++++++++++++*/
  // const initSubstrands = () => {
  //   getSubstrands().then((data) => {
  //     if (data.error) {
  //       setValues({ ...values, error: data.error });
  //     } else {
  //       setSubstrands(data);
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

  const initSubjects = () => {
    getSubjects().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setSubjects(data);
      }
    });
  };
  /*+++++++++++++++++++END OF STATE INITIALISATION++++++++++++++++++++++++++++*/

  const token = getCookie("token");
  const publishStrand = (e) => {
    e.preventDefault();
    createStrand(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          error: "",
          success: `Strand "${data.title}" was created`,
        });
        setSubstrands([]);
        setCheckedSubstrand([])
        setStatement([]);
        setYears([]);
        setSubjects([]);
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "", success: "" });
  };

  const handleStatement = (e) => {
    setStatement(e);
    formData.set("statement", e);

    //Store and populate the data in localstorage in the event of any anneccesary change
    if (typeof window !== "undefined") {
      localStorage.setItem("statement", JSON.stringify(e));
    }
  };

  //onChange functions for the substrands option checkbox
  const handleToggleSubstrands = (s) => () => {
    setValues({ ...values, error: "" });
    // return the first index or -1
    const clickedSubstrand = checkedSubstrand.indexOf(s);
    const all = [...checkedSubstrand];

    if (clickedSubstrand === -1) {
      all.push(s);
    } else {
      all.splice(clickedSubstrand, 1);
    }
    //console.log(all);
    setCheckedSubstrand(all);
    formData.set("substrands", all);
  };

  //show all the substrands that are available in the state; use the map method to loop through the substrand array
  // const showSubstrands = () => {
  //   return (
  //     substrands &&
  //     substrands.map((s, i) => (
  //       <li key={i} className="list-unstyled">
  //         <input
  //           onChange={handleToggle(s._id)} //push only the substrand id into the state
  //           type="checkbox"
  //           className="mr-1"
  //         />
  //         <label className="form-check-label">{s.title}</label>
  //       </li>
  //     ))
  //   );
  // };

  //onChange functions for the years option checkbox
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
  //show all the years that are available in the state; use the map method to loop through the years array
  // const showYears = () => {
  //   return (
  //     years &&
  //     years.map((y, i) => (
  //       <li key={i} className="list-unstyled">
  //         <input
  //           onChange={handleToggleYears(y._id)} //push only the year id into the state
  //           type="checkbox"
  //           className="mr-2"
  //         />
  //         <label className="form-check-label">{y.name}</label>
  //       </li>
  //     ))
  //   );
  // };

  /*****Filter methods - filter for strands using syllabus as the argument******/
  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const loadFilteredResults = (newFilters) => {
    getFilteredSubstrands(skip, limit, newFilters).then((data) => {
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

  const createStrandForm = () => {
    return (
      <form onSubmit={publishStrand}>
        <div className="form-group">
          <select onChange={handleChange("subject")} className="form-control">
            <option>Please Select The Subject</option>
            {subjects &&
              subjects.map((s, i) => (
                <option key={i} value={s._id}>
                  {s.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <select onChange={handleChange("level")} className="form-control">
            <option>Please Select The Level</option>
            {years &&
              years.map((y, i) => (
                <option key={i} value={y._id}>
                  {y.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Insert strand title here"
            value={title}
            onChange={handleChange("title")}
          />
        </div>

        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={statement}
            placeholder="Enter the strand statement here"
            onChange={handleStatement}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-outline-primary">
            Create
          </button>
        </div>
      </form>
    );
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
          <div className="col-md-6">{createStrandForm()}</div>
          <div className="col-md-6">
            <div className="mb-3">
              Check all years for this strand
              <hr />
              {showYears()}
            </div>
            <div>
              Filter substrands by syllabus
              <hr />
              <ul>
                <Checkbox
                  subjects={subjects}
                  handleFilters={(filters) => handleFilters(filters, "subject")}
                />
              </ul>
              <hr />
              {/* {showSubstrands()} */}
              {/* {JSON.stringify(filteredResults)} */}
              {filteredResults.map((substrand, i) => {
                return (
                  <div key={i}>
                    <li className="list-unstyled">
                      <input
                        onChange={handleToggleSubstrands(substrand._id)} //push only the strand id into the state
                        value={substrand._id}
                        type="checkbox"
                        className="mr-2"
                      />
                      <label className="form-check-label">
                        {substrand.title}
                      </label>
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

export default withRouter(Strand);
