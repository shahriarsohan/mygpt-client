import { NextRouter, useRouter } from "next/router";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { AuthState } from "@/types/store/authState";
import { AppState } from "@/store";
import { ThunkDispatch } from "redux-thunk";
import { AuthAction } from "@/store/actions/auth";
import { bindActionCreators } from "@reduxjs/toolkit";
import { login_with_google } from "@/store/actionCreators/auth";

type Props = LinkStateProps & LinkDispatchToProps;

const Login: FC<Props> = ({ login_with_google }) => {
  const router: NextRouter = useRouter();

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: `${process.env.NEXT_PUBLIC_GOOGLE_API}`,
      callback: onSuccess,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const onSuccess = (res: any): void => {
    console.log("data", res);
    login_with_google(res.credential, router);
  };

  const onFailure = (res: any): void => {};

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div id="signInDiv">asdasd</div>
    </div>
  );
};

interface LinkStateProps {
  auth: AuthState;
}

interface LinkDispatchToProps {
  // login_with_fb: (access_token: string, router: NextRouter) => void;
  login_with_google: (access_token: string, router: NextRouter) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AuthAction>
): LinkDispatchToProps => {
  return {
    // login_with_fb: bindActionCreators(login_with_fb, dispatch),
    login_with_google: bindActionCreators(login_with_google, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
