import { fetchCompetition, fetchCompetitions, fetchFeatured } from "../../API/competitionApi";
import { 
  COMPETITION_LOADING,
  COMPETITION_LOAD_ERROR, 
  COMPETITIONS_LOAD_SUCCESS,
  COMPETITION_LOAD_SUCCESS,
  FEATURED_LOAD_SUCCESS
} from "./competitionTypes";

export const competitionLoading = () => {
  return {
    type: COMPETITION_LOADING
  }
}

export const competitionLoadSuccess = (data) => {
  return {
    type: COMPETITION_LOAD_SUCCESS,
    payload: data
  }
}

export const competitionsLoadSuccess = (data) => {
  return {
    type: COMPETITIONS_LOAD_SUCCESS,
    payload: data
  }
}

export const featuredLoadSuccess = (data) => {
  return {
    type: FEATURED_LOAD_SUCCESS,
    payload: data
  }
}

export const competitionLoadError = (error) => {
  return {
    type: COMPETITION_LOAD_ERROR,
    payload: error
  }
}



export const getCompetition = (id) => {
  return (dispatch) => {
    dispatch(competitionLoading());
    return fetchCompetition(id).then(res => {
      dispatch(competitionLoadSuccess(res))
    }).catch(error => dispatch(competitionLoadError(error)))
  }
}

export const getCompetitions = () => {
  return (dispatch) => {
    dispatch(competitionLoading());
    return fetchCompetitions().then(res => {
      dispatch(competitionsLoadSuccess(res))
    }).catch(error => dispatch(competitionLoadError(error)))
  }
}

export const getFeatured = () => {
  return (dispatch) => {
    dispatch(competitionLoading());
    return fetchFeatured().then(res => {
      dispatch(featuredLoadSuccess(res))
    }).catch(error => dispatch(competitionLoadError(error)))
  }
}
