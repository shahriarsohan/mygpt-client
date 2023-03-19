import React from "react";
import { Popover, Link } from "@geist-ui/react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AuthAction } from "@/store/actions/auth";
import { logout } from "@/store/actionCreators/auth";
import { useRouter } from "next/router";

const UserSettings: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AuthAction>>();
  const router = useRouter();
  return (
    <>
      <Popover.Item title>
        <span onClick={() => dispatch(logout(router))}>Logout</span>
      </Popover.Item>
    </>
  );
};

export default UserSettings;
