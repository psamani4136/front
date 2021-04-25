import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuth, getCookie } from "../../actions/auth";
import {
  create,
  getSubstrandtitles,
  // removeSubstrandTitle,
} from "../../actions/substrand-title";
// import { getStrands } from "../../actions/strand";
import { getYears } from "../../actions/year";

const SubstrandTitle = () => {
  // const [strands, setStrands] = useState([]);
  const [years, setYears] = useState([]);
  const [titles, setTitles] = useState([]);
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    number: "",
    //year: "",
    // strand: "",
    removed: false,
    reload: false,
  });

  const {
    error,
    success,
    // year,
    name,
    number,
    // strand,
    removed,
    reload,
  } = values;
  const token = getCookie("token");

  const loadSubstrandTitles = () => {
    getSubstrandtitles().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTitles(data);
      }
    });
  };

  // const initStrands = () => {
  //   getStrands().then((data) => {
  //     if (data.error) {
  //       setValues({ ...values, error: data.error });
  //     } else {
  //       setStrands(data);
  //     }
  //   });
  // };

  // const initYears = () => {
  //   getYears().then((data) => {
  //     if (data.error) {
  //       setValues({ ...values, error: data.error });
  //     } else {
  //       setYears(data);
  //     }
  //   });
  // };

  // When the component mounts, all the methods below will be loaded from the database
  //into the state use the useEffect hook
  useEffect(() => {
    loadSubstrandTitles();
    // initYears();
    // initStrands();
  }, [reload]);

  const showSubstrandTitles = () => {
    return titles.map((t, i) => {
      return (
        <div key={i}>
          <strong>{t.number}</strong> {t.name}
        </div>
      );
    });
  };

  //   const deleteConfirm = (slug) => {
  //     let answer = window.confirm(
  //       "Are you sure you want to delete this category?"
  //     );
  //     if (answer) {
  //         deleteSubstrandTitle(slug);
  //     }
  //   };

  //   const deleteSubstrandTitle = (slug) => {
  //     removeSubstrandTitle(slug, token).then((data) => {
  //       if (data.error) {
  //         console.log(data.error);
  //       } else {
  //         setValues({
  //           ...values,
  //           error: false,
  //           success: false,
  //           name: "",
  //           removed: !removed,
  //           reload: !reload,
  //         });
  //       }
  //     });
  //   };

  const clickSubmit = (e) => {
    e.preventDefault();
    create({ name, number }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: "",
          number: "",
          removed: !removed,
          reload: !reload,
        });
        // setStrands([]);
        // setYears([]);
        // initYears();
        // initStrands();
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    setValues({ ...values, [name]: value, error: "", success: "" });
  };

  const newSubstrandTitleForm = () => (
    <form onSubmit={clickSubmit}>
      {/* <div className="form-group">
        <select onChange={handleChange("strand")} className="form-control">
          <option>Please Select The Strand</option>
          {strands &&
            strands.map((s, i) => (
              <option key={i} value={s._id}>
                {s.title}
              </option>
            ))}
        </select>
      </div> */}
      {/* <div className="form-group">
        <select onChange={handleChange("year")} className="form-control">
          <option>Please Select The Year level</option>
          {years &&
            years.map((y, i) => (
              <option key={i} value={y._id}>
                {y.name}
              </option>
            ))}
        </select>
      </div> */}
      <div className="form-group">
        <label className="text-muted">Substrand code</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("number")}
          value={number}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Substrand Title</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("name")}
          value={name}
          required
        />
      </div>
      <div>
        <button type="submit" className="btn btn-outline-primary">
          Create
        </button>
      </div>
    </form>
  );

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
      <div className="container">
        <div className="row">
          {showError()}
          {showSuccess()}
        </div>
      </div>
      <div className="container">
        <div className="row ">
          <div className="col-md-6 mt-4 mb-4">{newSubstrandTitleForm()}</div>
          <div className="col-md-6 mt-4 mb-4">{showSubstrandTitles()}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SubstrandTitle;
