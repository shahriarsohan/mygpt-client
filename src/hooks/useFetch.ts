import { useEffect, useState } from "react";

import { MyGptResponse } from "@/types/myGptResponse";
import authAxios from "@/http/authAxios";

export const useFetch = () => {
  const [apps, setApps] = useState<MyGptResponse[]>([]);
  const [error, setError] = useState<null | string>("");
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    setloading(true);
    authAxios
      .get("/core/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setApps(res.data.payload);
      })
      .catch((err) => {
        setError("Something went wrong");
      })
      .finally(() => {
        setloading(false);
      });
  }, []);
  return { loading, error, apps };
};
