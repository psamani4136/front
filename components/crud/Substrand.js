import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";

import { isAuth, getCookie } from "../../actions/auth";
import { createSubstrand } from "../../actions/substrand";
// import { getStrands } from "../../actions/strand";
import { getYears } from "../../actions/year";
import { getSubjects } from "../../actions/subject";
import { getTerms } from "../../actions/term";
import { getSubstrandtitles } from "../../actions/substrand-title";

//Rich editor for creating blog
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";

const Substrand = ({ router }) => {
  const blogFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("substrand")) {
      //data was save in ls; use the JSON.parse method to convert it into js object
      return JSON.parse(localStorage.getItem("substrand"));
    } else {
      return false;
    }
  };

  //states for the different content which will be populated with what is in the database
  const [years, setYears] = useState([]);
  const [terms, setTerms] = useState([]);
  // const [strand, setStrand] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [substrandTitles, setSubstrandTitles] = useState([]);
  const [checked, setChecked] = useState([]); // terms
  const [checkedYear, setCheckedYear] = useState([]); // years

  const [statement, setStatement] = useState(blogFromLS());
  const [values, setValues] = useState({
    error: "",
    success: "",
    formData: "",
    subject: "",
    level: "",
    title: "",
    periods: "",
    hidePublishButton: false,
  });

  const {
    error,
    success,
    formData,
    level,
    subject,
    title,
    periods,
    hidePublishButton,
  } = values;

  const token = getCookie("token");

  const publishSubstrand = (e) => {
    e.preventDefault();
    createSubstrand(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          years: "",
          title: "",
          periods: "",
          error: "",
          success: `A new substrand titled "${data.title}" is created`,
        });
        setStatement("");
        setYears([]);
        setSubjects([]);
        setChecked([]);
        setSubstrandTitles([]);
        // setStrand([]);
        setCheckedYear([]);
        //console.log(formData);
      }
    });
  };

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initYears();
    initSubjects();
    initTerms();
    // initStrands();
    initSubstrandTitle();
  }, [router]);

  const initYears = () => {
    getYears().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setYears(data);
      }
    });
  };

  // const initStrands = () => {
  //   getStrands().then((data) => {
  //     if (data.error) {
  //       setValues({ ...values, error: data.error });
  //     } else {
  //       setStrand(data);
  //     }
  //   });
  // };

  const initSubjects = () => {
    getSubjects().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setSubjects(data);
      }
    });
  };
  const initTerms = () => {
    getTerms().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTerms(data);
      }
    });
  };

  const initSubstrandTitle = () => {
    getSubstrandtitles().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setSubstrandTitles(data);
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "", success: "" });
  };

  const handleBody = (e) => {
    setStatement(e);
    formData.set("statement", e);

    //Store and populate the data in localstorage in the event of any anneccesary change
    if (typeof window !== "undefined") {
      localStorage.setItem("substrand", JSON.stringify(e));
    }
  };

  const createSubstrandForm = () => {
    return (
      <form onSubmit={publishSubstrand}>
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

        {/* <div className="form-group">
          <select onChange={handleChange("strand")} className="form-control">
            <option>Please Select A strand</option>
            {strand &&
              strand.map((s, i) => (
                <option key={i} value={s._id}>
                  {s.title}
                </option>
              ))}
          </select>
        </div> */}

        <div className="form-group">
          <select onChange={handleChange("years")} className="form-control">
            <option>Please Select The Year level</option>
            {years &&
              years.map((y, i) => (
                <option key={i} value={y._id}>
                  {y.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <select onChange={handleChange("subtitle")} className="form-control">
            <option>Please Select The Substrand Title</option>
            {substrandTitles &&
              substrandTitles.map((s, i) => (
                <option key={i} value={s._id}>
                  {s.number} {s.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Insert the name of the substrand here"
            value={title}
            onChange={handleChange("title")}
          />
        </div>
        <div className="form-group">
          {/* <label className="text-muted">Name of the substrand</label> */}
          <input
            type="text"
            className="form-control"
            placeholder="Insert the number of periods here"
            value={periods}
            onChange={handleChange("periods")}
          />
        </div>
        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={statement}
            placeholder="Insert the substrand statement here"
            onChange={handleBody}
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
  //onChange functions for the years option checkbox
  const handleToggleTerms = (t) => () => {
    setValues({ ...values, error: "" });
    // return the first index or -1
    const clickedTerm = checked.indexOf(t);
    const all = [...checked];

    if (clickedTerm === -1) {
      all.push(t);
    } else {
      all.splice(clickedTerm, 1);
    }
    console.log(all);
    setChecked(all);
    formData.set("terms", all);
  };
  //show all the years that are available in the state; use the map method to loop through the year array
  const showTerms = () => {
    return (
      terms &&
      terms.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleToggleTerms(t._id)} //push only the year id into the state
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{t.name}</label>
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
    console.log(all);
    setCheckedYear(all);
    formData.set("level", all);
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

        <div className="container">
          <div className="row">
            <div className="col-md-10">{createSubstrandForm()}</div>
            <div className="col-md-2">
              Substrand term <hr />
              {showTerms()}
              <br />
              Check all years <hr />
              {showYears()}
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </React.Fragment>
  );
};

export default withRouter(Substrand);
