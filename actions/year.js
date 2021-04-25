import fetch from "isomorphic-fetch";
import { API } from "../config";
import { handleResponse } from "./auth";

export const create = (name, token, slug) => {
  return fetch(`${API}/year`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(name),
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getYears = () => {
  return fetch(`${API}/years`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const singleYear = (slug) => {
  return fetch(`${API}/year/${slug}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeYear = (slug, token) => {
  return fetch(`${API}/year/${slug}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getYearSubstrands = (slug, substrand) => {
  return fetch(`${API}/year-substrands/${slug}`, {
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

// export const getYearSubstrands = (slug, syllabus) => {
//   return fetch(`${API}/section-year-substrands/${slug}`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(syllabus),
//   })
//     .then((response) => {
//       handleResponse(response);   
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };


export const getYearWithAllSubstrands = (slug, syllabus) => {
  return fetch(`${API}/year-syllabus-substrands/${slug}`, {
    
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

export const getYearStrandSubstrands = (slug, strand) => {
  return fetch(`${API}/year-strand-substrands/${slug}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(strand),
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
