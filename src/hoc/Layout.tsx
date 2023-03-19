/* eslint-disable react/prop-types */

import { Navbar } from "@/components";
import { AppState } from "@/store";
import { AuthState } from "@/types/store/authState";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import { ThunkDispatch } from "redux-thunk";

import { check_auth_status } from "../store/actionCreators/auth";
import { AuthAction } from "../store/actions/auth";

interface LayoutPropsTypes {
  title?: string;
  content?: string;
  children: React.ReactNode;
  products?: string;
  pathname: string;
  showSideBar: boolean;
}

type Ptops = LayoutPropsTypes & LinkStateProps;

const Layout: NextPage<Ptops> = ({
  title,
  content,
  children,
  auth,
}): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AuthAction>>();

  const router = useRouter();
  const isMounted = useRef();
  useEffect(() => {
    if (isMounted.current) return;
    if (dispatch && dispatch !== null && dispatch !== undefined)
      void dispatch(check_auth_status(router));
    // @ts-expect-error
    isMounted.current = true;
  });

  if (auth.isAuthenticated === false || null) {
    void router.push("/login");
  }

  if (auth?.loading) {
    return (
      <div
        style={{
          height: "100vh",
        }}
        className="w-full flex justify-center items-center"
      >
        <BeatLoader color="#36d7b7" />
      </div>
    );
  }

  if (auth.isAuthenticated === true) {
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={content} />
        </Head>

        <div>
          <Navbar />
          <div
            style={{
              backgroundColor: "#111",
            }}
            className="min-h-screen"
          >
            {children}
          </div>
        </div>
      </>
    );
  }
  return <></>;
};

Layout.defaultProps = {
  title: "MyGPT Dashboard",
};

interface LinkStateProps {
  auth: AuthState;
}

const mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(Layout);
