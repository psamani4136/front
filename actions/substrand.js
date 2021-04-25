import fetch from "isomorphic-fetch";
import { API } from "../config";
import { handleResponse } from "./auth";

export const createSubstrand = (formData, token) => {
  return fetch(`${API}/substrand`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSubstrands = () => {
  return fetch(`${API}/substrands`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const singleSubstrand = (slug) => {
  return fetch(`${API}/substrand/${slug}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const singleSubstrandWithOutcomes = (slug) => {
  return fetch(`${API}/substrand-outcomes/${slug}`, {
    method: "POST",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listRelatedSubstrands = (substrand) => {
  return fetch(`${API}/substrands/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(substrand),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listRelatedStrands = (substrand) => {
  return fetch(`${API}/strand/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(substrand),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));      
};

export const listRelatedSyllabuses = (substrand) => {
  return fetch(`${API}/substrand-syllabus/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(substrand),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getYearSubstrands = (slug, substrand) => {
  return fetch(`${API}/substrands-year/${slug}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(substrand),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


