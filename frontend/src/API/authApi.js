import axios from "axios";

const baseurl = "http://paradisebackend.herokuapp.com/";

const handleResponse = (res) => {
  return res.data;
};

const handleError = (err) => {
  const error = err.response;
  if (error) throw error.data;
  throw err;
};

const config = {
  headers: {
    "content-type": "application/json",
  },
};

export const login = ({ username, password }) => {
  return axios
    .post(
      baseurl + "accounts/api/auth/login",
      {
        username,
        password,
      },
      config
    )
    .then(handleResponse)
    .catch(handleError);
};

export const register = ({
  first_name,
  last_name,
  username,
  email,
  password,
}) => {
  return axios
    .post(
      baseurl + "accounts/api/auth/register",
      {
        first_name,
        last_name,
        username,
        email,
        password,
      },
      config
    )
    .then(handleResponse)
    .catch(handleError);
};

export const logout = (token) => {
  return axios
    .post(baseurl + "accounts/api/auth/logout", null, {
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    })
    .then(handleResponse)
    .catch(handleError);
};
