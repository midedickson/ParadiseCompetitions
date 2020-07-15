import axios from "axios";

const baseurl = "https://paradisebackend.herokuapp.com";

export const fetchCompetitions = () => {
  return axios
    .get(`${baseurl}/api/competition_list/`)
    .then((res) => res.data)
    .catch((res) => res.response);
};

export const fetchCompetition = (id) => {
  return axios
    .get(`${baseurl}/api/competition/${id}/`)
    .then((res) => res.data)
    .catch((err) => err.response);
};

export const fetchFeatured = () => {
  return axios
    .get(`${baseurl}/api/featured_competition_list/`)
    .then((res) => res.data)
    .catch((err) => err.response);
};
