import axios from './axios'

export const fetchCompetitions = () => {
  return axios.get(`/api/competition_list/`)
    .then(res => res.data)
    .catch(res => res.response)
}


export const fetchCompetition = (id) => {
  return axios.get(`/api/competition/${id}/`)
    .then(res => res.data)
    .catch(err => err.response)
}


export const fetchFeatured = () => {
  return axios.get(`/api/featured_competition_list/`)
    .then(res => res.data)
    .catch(err => err.response)
}
