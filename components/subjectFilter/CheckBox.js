import React, { useState, useEffect } from "react";

const Checkbox = ({ subjects, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggleSubject = (s) => () => {
    // return the first index or -1
    const currentSubjectId = checked.indexOf(s);
    const newCheckedSubjectId = [...checked];
    //if currently checked was not already in checked state > push
    // else pull/take off
    if (currentSubjectId === -1) {
      newCheckedSubjectId.push(s);
    } else {
      newCheckedSubjectId.splice(currentSubjectId, 1);
    }
    //console.log(newCheckedSubjectId);
    setChecked(newCheckedSubjectId);
    handleFilters(newCheckedSubjectId);
  };
  {
  }

  return subjects.map((s, i) => (
    <li key={i} className="list-unstyled">
      <input
        onChange={handleToggleSubject(s._id)} //push only the subject id into the state
        value={checked.indexOf(s._id === -1)}
        type="checkbox"
        className="mr-2"
      />
      <label className="form-check-label">{s.name}</label>
    </li>
  ));
};

export default Checkbox;
