import * as AuthTypes from "../actionTypes/auth";

interface AuthWithGoogleStart {
  type: AuthTypes.AuthWithGoogleTypes.AUTH_WITH_GOOGLE_START;
}
interface AuthWithGoogleSuccess {
  type: AuthTypes.AuthWithGoogleTypes.AUTH_WITH_GOOGLE_SUCCESS;
  payload: string;
}

interface AuthWithGoogleFaild {
  type: AuthTypes.AuthWithGoogleTypes.AUTH_WITH_GOOGLE_FAILD;
  payload: string;
}

interface AuthWithFBStart {
  type: AuthTypes.AuthWithFacebookTypes.AUTH_WITH_FACEBOOK_START;
}

interface AuthWithFBSuccess {
  type: AuthTypes.AuthWithFacebookTypes.AUTH_WITH_FACEBOOK_SUCCESS;
  payload: string;
}

interface AuthWithFBFaild {
  type: AuthTypes.AuthWithFacebookTypes.AUTH_WITH_FACEBOOK_FAILD;
  payload: string;
}

interface LoadUserStart {
  type: AuthTypes.LoadUserTypes.LOAD_USER_START;
}

interface LoadUserSuccess {
  type: AuthTypes.LoadUserTypes.LOAD_USER_SUCCESS;
  payload: {};
}

interface LoadUserFaild {
  type: AuthTypes.LoadUserTypes.LOAD_USER_FAILD;
  payload: string;
}

interface CheckAuthStatusStart {
  type: AuthTypes.CheckAuthStatusTypes.CHECK_AUTH_STATUS_START;
}

interface CheckAuthStatusSuccess {
  type: AuthTypes.CheckAuthStatusTypes.CHECK_AUTH_STATUS_SUCCESS;
  payload: string;
}

interface CheckAuthStatusFaild {
  type: AuthTypes.CheckAuthStatusTypes.CHECK_AUTH_STATUS_FAILD;
  payload: string;
}

interface RefreshTokenStart {
  type: AuthTypes.RefreshTokenTypes.REFRESH_TOKEN_START;
}

interface RefreshTokenSuccess {
  type: AuthTypes.RefreshTokenTypes.REFRESH_TOKEN_SUCCESS;
}

interface RefreshTokenFaild {
  type: AuthTypes.RefreshTokenTypes.REFRESH_TOKEN_FAILD;
  payload: string;
}

interface LogoutStart {
  type: AuthTypes.LogoutTypes.LOGOUT_START;
}

interface LogoutSuccess {
  type: AuthTypes.LogoutTypes.LOGOUT_SUCCESS;
  payload: string;
}

interface LogoutFaild {
  type: AuthTypes.LogoutTypes.LOGOUT_FAILD;
  payload: string;
}

export type AuthAction =
  | AuthWithGoogleStart
  | AuthWithGoogleSuccess
  | AuthWithGoogleFaild
  | AuthWithFBStart
  | AuthWithFBSuccess
  | AuthWithFBFaild
  | LoadUserStart
  | LoadUserSuccess
  | LoadUserFaild
  | CheckAuthStatusStart
  | CheckAuthStatusSuccess
  | CheckAuthStatusFaild
  | RefreshTokenStart
  | RefreshTokenSuccess
  | RefreshTokenFaild
  | LogoutStart
  | LogoutSuccess
  | LogoutFaild;
