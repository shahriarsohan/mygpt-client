import * as Types from "../actionTypes/auth";
import { AuthAction } from "../actions/auth";
import { AuthState } from "@/types/store/authState";

const Initial_State: AuthState = {
  loading: false,
  error: null,
  msg: "",
  user: {},
  isAuthenticated: null,
};

const reducer = (state = Initial_State, action: AuthAction): AuthState => {
  switch (action.type) {
    case Types.LoadUserTypes.LOAD_USER_START:
      return {
        ...state,
        loading: true,
      };
    case Types.LoadUserTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case Types.LoadUserTypes.LOAD_USER_FAILD:
      return {
        ...state,
        loading: false,
      };
    case Types.CheckAuthStatusTypes.CHECK_AUTH_STATUS_START:
      return {
        ...state,
        loading: true,
      };
    case Types.CheckAuthStatusTypes.CHECK_AUTH_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    case Types.CheckAuthStatusTypes.CHECK_AUTH_STATUS_FAILD:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case Types.RefreshTokenTypes.REFRESH_TOKEN_START:
      return {
        ...state,
        loading: true,
      };
    case Types.RefreshTokenTypes.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    case Types.RefreshTokenTypes.REFRESH_TOKEN_FAILD:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    case Types.LogoutTypes.LOGOUT_START:
      return {
        ...state,
        loading: true,
      };
    case Types.LogoutTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };

    case Types.AuthWithFacebookTypes.AUTH_WITH_FACEBOOK_START:
      return {
        ...state,
        loading: true,
      };
    case Types.AuthWithFacebookTypes.AUTH_WITH_FACEBOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    case Types.AuthWithFacebookTypes.AUTH_WITH_FACEBOOK_FAILD:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: "Something went wrong",
      };
    case Types.AuthWithGoogleTypes.AUTH_WITH_GOOGLE_START:
      return {
        ...state,
        loading: true,
      };
    case Types.AuthWithGoogleTypes.AUTH_WITH_GOOGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    case Types.AuthWithGoogleTypes.AUTH_WITH_GOOGLE_FAILD:
      return {
        ...state,
        loading: false,
        error: "Something went wrong",
      };
    default:
      return state;
  }
};

export default reducer;
