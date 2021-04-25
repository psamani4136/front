import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuth, getCookie } from "../../actions/auth";
import { create, getYears, removeYear } from "../../actions/year";

const Year = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    years: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, years, removed, reload } = values;
  const token = getCookie("token");

  const loadYears = () => {
    getYears().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, years: data });
      }
    });
  };
  // When the component mounts, all the years will be loaded from the database
  //into the state use the useEffect hook; there it will be shown immediately
  useEffect(() => {
    loadYears();
  }, [reload]);

  const showYears = () => {
    return years.map((y, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(y.slug)}
          title="Double click to delete"
          key={i}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
        >
          {y.name}
        </button>
      );
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure you want to delete this level?");
    if (answer) {
      deleteYear(slug);
    }
  };

  const deleteYear = (slug) => {
    // console.log('delete', slug);
    removeYear(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: "",
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    create({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: "",
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: "",
    });
  };

  const newYearFom = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Year level</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          required
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  );

  return (
    <React.Fragment>
      {newYearFom()}
      <div className="mr-1 ml-1 mt-3">* Double Click to delete a year</div>
      <div>{showYears()}</div>
    </React.Fragment>
  );
};

export default Year;
