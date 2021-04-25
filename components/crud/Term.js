import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuth, getCookie } from "../../actions/auth";
import { create, getTerms, removeTerm } from "../../actions/term";

const Term = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    terms: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, terms, removed, reload } = values;
  const token = getCookie("token");

  const loadTerms = () => {
    getTerms().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, terms: data });
      }
    });
  };
  // When the component mounts, all the terms will be loaded from the database
  //into the state use the useEffect hook
  useEffect(() => {
    loadTerms();
  }, [reload]);

  const showTerms = () => {
    return terms.map((t, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(t.slug)}
          title="Double click to delete"
          key={i}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
        >
          {t.name}
        </button>
      );
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure you want to delete this term?");
    if (answer) {
      deleteTerm(slug);
    }
  };

  const deleteTerm = (slug) => {
    removeTerm(slug, token).then((data) => {
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

  const newTermFom = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Term Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
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

  return (
    <React.Fragment>
      {newTermFom()}
      <div className="mr-1 ml-1 mt-3">* Double Click to delete a term</div>
      <div>{showTerms()}</div>
    </React.Fragment>
  );
};

export default Term;
