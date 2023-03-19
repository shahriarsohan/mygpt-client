import { useState, useEffect } from "react";

import { UserTypes } from "@/types/userTypes";
import authAxios from "@/http/authAxios";

export const useFetchUser = () => {
  const [user, setUser] = useState<UserTypes>({} as UserTypes);

  useEffect(() => {
    authAxios
      .get("/account/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log("ERROR");
        //TODO: Handle it properly
      });
  }, []);

  return { user };
};
