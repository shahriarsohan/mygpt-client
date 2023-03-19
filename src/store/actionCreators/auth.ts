import * as AuthActionType from "../actionTypes/auth";
import { AuthAction } from "../actions/auth";
import { NextRouter } from "next/router";

import { Dispatch } from "redux";
import axios from "axios";

export const load_user = () => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({
    type: AuthActionType.LoadUserTypes.LOAD_USER_START,
  });

  try {
    const res = await fetch("/api/accounts/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      dispatch({
        type: AuthActionType.LoadUserTypes.LOAD_USER_SUCCESS,
        payload: data.user,
      });
    } else {
      dispatch({
        type: AuthActionType.LoadUserTypes.LOAD_USER_FAILD,
        payload: "Something went wrong",
      });
    }
  } catch (err) {
    dispatch({
      type: AuthActionType.LoadUserTypes.LOAD_USER_FAILD,
      payload: "Something went wrong",
    });
  }
};

export const check_auth_status =
  (router: NextRouter) => async (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionType.CheckAuthStatusTypes.CHECK_AUTH_STATUS_START,
    });

    try {
      // const res = await fetch("/api/accounts/verify", {
      //   method: "GET",
      //   headers: {
      //     Accept: "application/json",
      //   },
      // });
      const token = localStorage.getItem("token");
      const res = await axios.post("http://127.0.0.1:8000/api/token/verify/", {
        token,
      });

      if (res.status === 200) {
        dispatch({
          type: AuthActionType.CheckAuthStatusTypes.CHECK_AUTH_STATUS_SUCCESS,
          payload: "",
        });
        // dispatch<any>(load_user());
      } else {
        dispatch({
          type: AuthActionType.CheckAuthStatusTypes.CHECK_AUTH_STATUS_FAILD,
          payload: "Something went wrong",
        });
      }
    } catch (err) {
      dispatch({
        type: AuthActionType.CheckAuthStatusTypes.CHECK_AUTH_STATUS_FAILD,
        payload: "Something went wrong",
      });
    }
  };

export const logout =
  (router: NextRouter) => async (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionType.LogoutTypes.LOGOUT_START,
    });

    localStorage.removeItem("token");
    router.push("/");
    dispatch({
      type: AuthActionType.LogoutTypes.LOGOUT_SUCCESS,
      payload: "Logged Out successfully",
    });
  };

export const login_with_google =
  (access_token: string, router: NextRouter) =>
  async (dispatch: Dispatch<AuthAction>) => {
    const body = JSON.stringify({
      access_token,
    });

    console.log("access_token", access_token);

    dispatch({
      type: AuthActionType.AuthWithGoogleTypes.AUTH_WITH_GOOGLE_START,
    });

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/account/rest-auth/google/",
        {
          access_token,
        }
      );
      if (res.status === 200) {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);

        void router.push("/dashboard");
        dispatch({
          type: AuthActionType.AuthWithGoogleTypes.AUTH_WITH_GOOGLE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: AuthActionType.AuthWithGoogleTypes.AUTH_WITH_GOOGLE_FAILD,
          payload: "Something went wrong",
        });
      }
    } catch (error) {
      dispatch({
        type: AuthActionType.AuthWithGoogleTypes.AUTH_WITH_GOOGLE_FAILD,
        payload: "Something went wrong",
      });
    }
  };
