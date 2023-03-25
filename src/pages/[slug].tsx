import publixAxios from "@/http/publicAxios";
import { MyGptResponse } from "@/types/myGptResponse";
import { Button, Dot, Note, Spacer, Textarea } from "@geist-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {
  data: MyGptResponse;
};

// TODO: Create a nice ui like messenger
const MyGptApp = ({ data }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [answer, setAnswer] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);

  const router = useRouter();

  const habdleSubmit = async () => {
    setLoading(true);

    await publixAxios
      .post(`core/use/${router?.query?.slug}`, {
        msg,
      })
      .then((res) => {
        setAnswer(res.data.answer);
        setError(null);
      })
      .catch((err) => {
        setAnswer(null);
        setError("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-2xl p-3 m-2 mx-auto">
      <Head>
        <title>{data?.name}</title>
      </Head>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <button className="h-10 w-10 flex items-center justify-center rounded bg-gray-800">
            <p className="leading-1">{data.icon}</p>
          </button>
          <p className="text-center font-inter capitalize">{data?.name}</p>
        </div>
        {loading ? (
          <Dot style={{ marginRight: "15px" }} type="warning" />
        ) : (
          <Dot style={{ marginRight: "15px" }} type="success" />
        )}
      </div>
      <div>
        <p className="text-xs font-inter mb-6 capitalize">
          {data?.description}
        </p>
      </div>
      <form>
        <div className="mt-10">
          <p className="text-xs leading-3 text-gray-300">Tell mw what to do</p>
          <Textarea
            required
            value={msg}
            name="msg"
            onChange={(e) => setMsg(e.target.value)}
            height={10}
            width={"100%"}
            placeholder={data?.demoInput}
          />
        </div>
        <Spacer />
        <div className="flex items-center justify-end">
          <Button onClick={habdleSubmit} loading={loading} type="success">
            Send
          </Button>
        </div>
      </form>
      <Spacer />
      <div>{answer ? <Note>{answer}</Note> : null}</div>
      <div>{error ? <Note type="error">{error}</Note> : null}</div>
    </div>
  );
};

export default MyGptApp;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const appSlug = context.query.slug;

  const res = await publixAxios.get(`core/use/${appSlug}`);
  return {
    props: {
      data: res.data.data,
    },
  };
};
