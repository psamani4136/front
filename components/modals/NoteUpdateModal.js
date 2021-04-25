import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import renderHTML from "react-render-html";

import { singleNote, updateNote } from "../../actions/note";
import { isAuth, getCookie } from "../../actions/auth";

//Rich editor for creating strand statement
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";

const noteModal = (props) => {
  const { className, slug } = props;

  // const [title, setTitle] = useState("");
  const [body, setBody] = useState([]);
  const [values, setValues] = useState({
    error: "",
    success: "",
    title: "",

    formData: "",
  });

  const { error, success, formData, title } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initNote();
  }, [slug]);

  const initNote = () => {
    if (slug) {
      singleNote(slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setBody(data.body);
          setValues({ ...values, title: data.title });
        }
      });
    }
  };

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    //const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "", success: "" });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
  };

  const token = getCookie("token");

  const editNote = (e) => {
    e.preventDefault();
    updateNote(slug, token, formData).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBody("");
        setValues({ ...values, title: "", body: "" });
      }
    });
  };

  const UpdateNoteForm = () => {
    return (
      <form onSubmit={editNote}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleChange("title")}
          />
        </div>
        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            onChange={handleBody}
          />
        </div>
        <div>
          <button toggle={toggle} type="submit" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </form>
    );
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <Button color="primary" onClick={toggle}>
        UPDATE
      </Button>
      <Modal
        isOpen={modal}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 700 }}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>Update this note</ModalHeader>
        <ModalBody>
          <UpdateNoteForm />
        </ModalBody>
      </Modal>
    </>
  );
};

export default withRouter(noteModal);
