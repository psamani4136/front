import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";

import { isAuth, getCookie } from "../../actions/auth";
import { createOutcome } from "../../actions/outcome";
import { getSubstrands } from "../../actions/substrand";
import { getYears } from "../../actions/year";
import { getSubjects } from "../../actions/subject";
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

    if (localStorage.getItem("assessment")) {
      //data was save in ls; use the JSON.parse method to convert it into js object
      return JSON.parse(localStorage.getItem("assessment"));
    } else {
      return false;
    }
  };

  const generalFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("general")) {
      //data was save in ls; use the JSON.parse method to convert it into js object
      return JSON.parse(localStorage.getItem("general"));
    } else {
      return false;
    }
  };

  const [values, setValues] = useState({
    error: "",
    success: "",
    formData: "",
    subject: "",
    strand: "",
    year: "",
    content: "",

    hidePublishButton: false,
  });

  const { error, success, formData, content, hidePublishButton } = values;

  const [assessment, setAssessment] = useState(assessmentFromLS());
  const [general, setGeneral] = useState(generalFromLS());
  const [subjects, setSubjects] = useState([]);
  const [strands, setStrands] = useState([]);
  //states for the different content which will be populated with what is in the database
  const [substrands, setSubstrands] = useState([]);
  const [checked, setChecked] = useState([]); // substrand

  const [years, setYears] = useState([]);
  const [checkedYear, setCheckedYear] = useState([]); // Years

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initSubstrands();
    initYears();
    initSubjects();
    initStrands();
  }, [router]);

  const initSubstrands = () => {
    getSubstrands().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setSubstrands(data);
      }
    });
  };

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

  const token = getCookie("token");
  const publishOutcome = (e) => {
    e.preventDefault();
    createOutcome(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          content: "",
          error: "",

          success: `General Learning Outcome "${data.content}" was created`,
        });
        setAssessment("");
        setSubstrands([]);
        setYears([]);
        setSubjects([]);
        setStrands([]);
        setGeneral("");
        //console.log(formData);
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "", success: "" });
  };

  const handleBody = (e) => {
    setAssessment(e);
    formData.set("assessment", e);

    //Store and populate the data in localstorage in the event of any anneccesary change
    if (typeof window !== "undefined") {
      localStorage.setItem("assessment", JSON.stringify(e));
    }
  };

  const handleGeneral = (e) => {
    setGeneral(e);
    formData.set("general", e);

    //Store and populate the data in localstorage in the event of any anneccesary change
    if (typeof window !== "undefined") {
      localStorage.setItem("general", JSON.stringify(e));
    }
  };

  const createOutcomeForm = () => {
    return (
      <form onSubmit={publishOutcome}>
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
            <option>Please Select The Strand</option>
            {strands &&
              strands.map((s, i) => (
                <option key={i} value={s._id}>
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
            value={general}
            placeholder="General Learning Outcome"
            onChange={handleGeneral}
          />
        </div>

        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={assessment}
            placeholder="Summative assessment"
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

  //onChange functions for the substrand option checkbox
  // const handleToggle = (s) => () => {
  //   setValues({ ...values, error: "" });
  //   // return the first index or -1
  //   const clickedSubstrand = checked.indexOf(s);
  //   const all = [...checked];

  //   if (clickedSubstrand === -1) {
  //     all.push(s);
  //   } else {
  //     all.splice(clickedSubstrand, 1);
  //   }
  //   //console.log(all);
  //   setChecked(all);
  //   formData.set("substrand", all);
  // };
  //
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
  // const handleToggleYears = (y) => () => {
  //   setValues({ ...values, error: "" });
  //   // return the first index or -1
  //   const clickedYear = checked.indexOf(y);
  //   const all = [...checkedYear];

  //   if (clickedYear === -1) {
  //     all.push(y);
  //   } else {
  //     all.splice(clickedYear, 1);
  //   }
  //   console.log(all);
  //   setCheckedYear(all);
  //   formData.set("years", all);
  // };
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
          <div className="col-md-12">{createOutcomeForm()}</div>
        </div>
      </div>
      {/*  */}
    </React.Fragment>
  );
};

export default withRouter(Outcome);
