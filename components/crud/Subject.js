import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuth, getCookie } from "../../actions/auth";
import {
  createSubject,
  getSubjects,
  removeSubject,
} from "../../actions/subject";

const Subject = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    subjects: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, subjects, removed, reload } = values;
  const token = getCookie("token");

  const loadSubject = () => {
    getSubjects().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, subjects: data });
      }
    });
  };
  // When the component mounts, all the subjects will be loaded from the database
  //into the state use the useEffect hook; there it will be shown immediately
  useEffect(() => {
    loadSubject();
  }, [reload]);

  const showSubjects = () => {
    return subjects.map((s, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(s.slug)}
          title="Double click to delete"
          key={i}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
        >
          {s.name}
        </button>
      );
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm(
      "Are you sure you want to delete this subject?"
    );
    if (answer) {
      deleteSubject(slug);
    }
  };

  const deleteSubject = (slug) => {
    // console.log('delete', slug);
    removeSubject(slug, token).then((data) => {
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
    createSubject({ name }, token).then((data) => {
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

  const newSubjectFom = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Create a subject</label>
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
      {newSubjectFom()}
      <div className="mr-1 ml-1 mt-3">* Double Click to delete a subject</div>
      <div>{showSubjects()}</div>
    </React.Fragment>
  );
};

export default Subject;
