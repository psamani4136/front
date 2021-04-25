import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import renderHTML from "react-render-html";

import { isAuth, getCookie } from "../../../actions/auth";
import { getNotes } from "../../../actions/note";

const MyNote = () => {
  const userId = isAuth() && isAuth().id;
  const token = getCookie("token");

  const loadNotes = () => {
    getNotes(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMyNotes(data);
      }
    });
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const loadMyNotes = () => {
    return myNotes.map((note, i) => {
      return (
        <div className="mb-3" key={i}>
          <Card>
            <CardBody>
              <CardTitle>
                <strong>{note.title}</strong>
              </CardTitle>
              <CardText>{renderHTML(note.body)}</CardText>
              <CardText>
                <small className="text-muted">Last updated 3 mins ago</small>
              </CardText>
            </CardBody>
          </Card>
        </div>
      );
    });
  };

  return <div>{loadMyNotes()}</div>;
};

export default MyNote;
