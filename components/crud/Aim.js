import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";

import { isAuth, getCookie } from "../../actions/auth";
import { createAim } from "../../actions/aim";

//Rich editor for creating introduction body
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";

const Aim = ({ router }) => {
  const aimFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("aim")) {
      //data was save in ls; use the JSON.parse method to convert it into js object
      return JSON.parse(localStorage.getItem("aim"));
    } else {
      return false;
    }
  };
  const [values, setValues] = useState({
    error: "",
    success: "",
    formData: "",
    identifier: "",
    title: "",
    hidePublishButton: false,
  });

  const {
    error,
    success,
    formData,
    identifier,
    title,
    hidePublishButton,
  } = values;

  const [body, setBody] = useState(aimFromLS());

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, [router]);

  const token = getCookie("token");
  const publishAim = (e) => {
    e.preventDefault();
    createAim(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          identifier: "",
          title: "",
          error: "",
          success: `Aim "${data.identifier}" was created`,
        });
        setBody("");
      }
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

    //Store and populate the data in localstorage in the event of any anneccesary change
    if (typeof window !== "undefined") {
      localStorage.setItem("aim", JSON.stringify(e));
    }
  };

  const createAimForm = () => {
    return (
      <form onSubmit={publishAim}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Insert an identifier here"
            value={identifier}
            onChange={handleChange("identifier")}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Insert a title here"
            value={title}
            onChange={handleChange("title")}
          />
        </div>
        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder="Enter Aim Body here"
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
          <div className="col-md-12">{createAimForm()}</div>
        </div>
      </div>
      {/*  */}
    </React.Fragment>
  );
};

export default withRouter(Aim);
