import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";

import { isAuth, getCookie } from "../../actions/auth";
import { createIndicator } from "../../actions/indicator";
import { getYears } from "../../actions/year";
import { getSubjects } from "../../actions/subject";
import { getSubstrands } from "../../actions/substrand";
import { getStrands } from "../../actions/strand";

//Rich editor for creating blog
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";

const Outcome = ({ router }) => {
  const assessmentFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("formative")) {
      //data was save in ls; use the JSON.parse method to convert it into js object
      return JSON.parse(localStorage.getItem("formative"));
    } else {
      return false;
    }
  };

  const specificFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("specific")) {
      //data was save in ls; use the JSON.parse method to convert it into js object
      return JSON.parse(localStorage.getItem("specific"));
    } else {
      return false;
    }
  };

  const activityFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("activity")) {
      //data was save in ls; use the JSON.parse method to convert it into js object
      return JSON.parse(localStorage.getItem("activity"));
    } else {
      return false;
    }
  };

  const [values, setValues] = useState({
    error: "",
    success: "",
    formData: "",
    subject: "",
    substrand: "",
    strand: "",
    year: "",
    content: "",
  });

  const {
    error,
    success,
    formData,
    content,
    substrand,
    subject,
    strand,
    year,
  } = values;

  const [assessment, setAssessment] = useState(assessmentFromLS());
  const [specific, setSpecific] = useState(specificFromLS());
  const [activity, setActivity] = useState(activityFromLS());
  const [strands, setStrands] = useState([]);
  const [substrands, setSubstrands] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initYears();
    initSubjects();
    initStrands();
    initSubstrands();
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

  const initSubjects = () => {
    getSubjects().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setSubjects(data);
      }
    });
  };

  const initStrands = () => {
    getStrands().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setStrands(data);
      }
    });
  };

  const initSubstrands = () => {
    getSubstrands().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setSubstrands(data);
      }
    });
  };

  const token = getCookie("token");
  const publishIndicator = (e) => {
    e.preventDefault();
    createIndicator(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          content: "",
          error: "",
          success: `An Indicator was created`,
        });
        setAssessment("");
        setActivity("");
        setSpecific("");
        setSubjects("");
        setStrands("");
        setSubstrands("");
        setYears("");
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "", success: "" });
  };

  const handleSpecific = (e) => {
    setSpecific(e);
    formData.set("specific", e);

    //Store and populate the data in localstorage in the event of any anneccesary change
    if (typeof window !== "undefined") {
      localStorage.setItem("specific", JSON.stringify(e));
    }
  };

  const handleActivity = (e) => {
    setActivity(e);
    formData.set("activity", e);

    //Store and populate the data in localstorage in the event of any anneccesary change
    if (typeof window !== "undefined") {
      localStorage.setItem("activity", JSON.stringify(e));
    }
  };

  const handleAssessment = (e) => {
    setAssessment(e);
    formData.set("assessment", e);

    //Store and populate the data in localstorage in the event of any anneccesary change
    if (typeof window !== "undefined") {
      localStorage.setItem("formative", JSON.stringify(e));
    }
  };

  const createIndicatorForm = () => {
    return (
      <form onSubmit={publishIndicator}>
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
          <select onChange={handleChange("strand")} className="form-control">
            <option>Please Select A Strand</option>
            {strands &&
              strands.map((s, i) => (
                <option key={s} value={s._id}>
                  {s.title}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <select onChange={handleChange("substrand")} className="form-control">
            <option>Please Select The Substrand</option>
            {substrands &&
              substrands.map((s, i) => (
                <option key={i} value={s._id}>
                  {s.title}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <select onChange={handleChange("year")} className="form-control">
            <option>Please Select The Year</option>
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
            placeholder="Insert key concept here"
            value={content}
            onChange={handleChange("content")}
          />
        </div>

        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={specific}
            placeholder="Specific Learning Outcome"
            onChange={handleSpecific}
          />
        </div>

        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={activity}
            placeholder="Activity For the Specific Learning Outcome Above"
            onChange={handleActivity}
          />
        </div>

        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={assessment}
            placeholder="Formative assessment For the Specific Learning Outcome Above"
            onChange={handleAssessment}
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
          <div className="col-md-12">{createIndicatorForm()}</div>
        </div>
      </div>
      {/*  */}
    </React.Fragment>
  );
};

export default withRouter(Outcome);
