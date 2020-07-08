import {
  COMPETITION_LOADING,
  COMPETITION_LOAD_ERROR,
  COMPETITION_LOAD_SUCCESS,
  COMPETITIONS_LOAD_SUCCESS,
  FEATURED_LOAD_SUCCESS,
  FEATURED_LOAD_ERROR
} from "./competitionTypes";

const initialState = {
  loading: false,
  error: null,
  success: false,
  all: [],
  competition: null,
  featuredCompetition: []
}

const competitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPETITION_LOADING:
      state = {
        ...state,
        loading: true,
        error: null
      }
      return state;
    case COMPETITIONS_LOAD_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
        success: true,
        all: action.payload
      }
      return state;
    case COMPETITION_LOAD_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
        success: true,
        competition: action.payload
      }
      return state;
    case FEATURED_LOAD_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
        success: true,
        featuredCompetition: action.payload
      }
      return state;
    case COMPETITION_LOAD_ERROR:
      state = {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
        all: [],
        competition: null,
      }
      return state;
    case FEATURED_LOAD_ERROR:
      state = {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
        all: [],
        featuredCompetition: null,
      }
      return state;
    default:
      return state
  }
}

export default competitionReducer;