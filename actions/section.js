import fetch from "isomorphic-fetch";
import { API } from "../config";
import { handleResponse } from "./auth";

export const getSectionSyllabus = (slug, syllabus) => {
    return fetch(`${API}/section-syllabus/${slug}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(syllabus),
    })
      .then((response) => {
        handleResponse(response);       
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  export const getSubstrandSyllabusSections = (substrand) => {
    return fetch(`${API}/section-substrand-syllabus`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(substrand),
    })
      .then((response) => {
        handleResponse(response);       
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  export const getSyllabusSection = (slug, substrand) => {
    return fetch(`${API}/syllabus-section/${slug}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(substrand),
    })
      .then((response) => {
        handleResponse(response);       
        return response.json();
      })
      .catch((err) => console.log(err));
  };