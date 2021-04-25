import fetch from "isomorphic-fetch";
import { API } from "../config";
import { handleResponse } from "./auth";

export const createOutcome = (formData, token) => {
  return fetch(`${API}/outcome`, {
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

export const getOutcomes = () => {
  return fetch(`${API}/outcomes`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const singleOutcome = (slug) => {
  return fetch(`${API}/outcome-substrand-strand/${slug}`, {
    method: "POST",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listRelatedOutcomes = (outcome) => {
  return fetch(`${API}/outcomes/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(outcome),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getYearSubstrands = (slug, outcome) => {
  return fetch(`${API}/outcome-year-substrands/${slug}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(outcome),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};