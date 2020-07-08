import { login, register, logout } from "../../API/authApi";
import { AUTH_LOADING, AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR } from "./authTypes";
import * as tokenService from "../../Utils/tokenService";

export const authLoading = () => {
  return {
    type: AUTH_LOADING
  }
}

export const authSuccess = (token) => {
  return {
    type: AUTH_SUCCESS,
    payload: token
  }

}

export const authClear = () => {
  return {
    type: AUTH_LOGOUT,
  }
}

export const authError = (error) => {
  console.log(error)
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export const authLogin = (data) => {
  return (dispatch) => {
    dispatch(authLoading());
    return login(data).then(res => {
      const { user, token } = res
      tokenService.saveToken(token)
      dispatch(authSuccess(user))
    }).catch(error => dispatch(authError(error)))
  }
}

export const authRegister = (data) => {
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      let res = await register(data);
      const { user, token } = res;
      tokenService.saveToken(token);
      dispatch(authSuccess(user));
    }
    catch (error) {
      return dispatch(authError(error));
    }
  }
}

export const authLogout = (token) => {
  return (dispatch) => {
    logout(token).then(() => {
      tokenService.removeToken()
      dispatch(authClear(token))
    }).catch(error => dispatch(authError(error)))
  }
}