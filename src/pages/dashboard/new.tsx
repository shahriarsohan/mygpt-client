import { EmojiField } from "@/components";
import {
  Button,
  Card,
  Grid,
  Input,
  Note,
  Spacer,
  Textarea,
  Toggle,
  useTheme,
} from "@geist-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as Yup from "yup";
import * as Icon from "react-feather";
import authAxios from "@/http/authAxios";

type HandleSubmitInputTypes = {
  name: string;
  emoji: string;
  description: string;
  propmt: string;
  example_input: string;
};

const NewApp = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("🤖");

  const [loading, setLoading] = useState<boolean>(false);
  const [pvt, setPvt] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      emoji: "",
      name: "",
      description: "",
      propmt: "",
      example_input: "",
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Please enter name"),
      description: Yup.string().min(6, "Too Short!").required("Required"),
      propmt: Yup.string().min(10, "Too Short!").required("Required"),
      example_input: Yup.string().min(6, "Too Short!").required("Required"),
    }),
  });

  const handleSubmit = async (values: HandleSubmitInputTypes) => {
    setLoading(true);
    const res = await authAxios
      .post(
        "/core/",
        {
          icon: selectedEmoji,
          name: values.name,
          description: values.description,
          propmt: values.propmt,
          demoInput: values.example_input,
          private: pvt,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        router.push(`/${res.data.payload.slug}`);
      })
      .catch((err) => {
        setError("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="page__wrapper">
        <div className="page__content">
          <div>
            <div>
              <div
                onClick={() => router.back()}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Icon.ArrowLeft size={15} color="gray" />
                <p className="text-gray-400 text-xs font-semibold font-inter">
                  Back
                </p>
              </div>
            </div>
            {/* <p className="font-inter my-5">
              Please follow the steps to configure your Project and deploy it.
            </p> */}
          </div>
          <Grid.Container gap={2} marginTop={1} justify="flex-start">
            <Grid sm={24}>
              <Card width={"100%"}>
                <section className="pt-4">
                  <div className="">
                    <div className="bg-black rounded-sm">
                      <div className="border-b border-b-gray-800">
                        <p className="text-2xl md:p-6 py-3 font-inter font-bold">
                          Configure App
                        </p>
                      </div>
                      <form
                        // onSubmit={formik.handleSubmit}
                        className="p-6 flex flex-col"
                      >
                        <EmojiField
                          value={selectedEmoji}
                          onChange={setSelectedEmoji}
                        />
                        <div>
                          <Input
                            required
                            id="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter App Name"
                            width={"100%"}
                          >
                            App Name
                          </Input>
                          {formik.touched.name === true &&
                          formik.errors.name !== null ? (
                            <p className="text-xs p-1 text-red-500">
                              {formik.errors.name}
                            </p>
                          ) : null}
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">
                            App Description
                          </p>
                          <Textarea
                            required
                            id="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            width="100%"
                            placeholder="Now is the optimal workflow for frontend teams. All-in-one: Static and JAMstack deployment, Serverless Functions, and Global CDN."
                          />
                          {formik.touched.description === true &&
                          formik.errors.description !== null ? (
                            <p className="text-xs p-1 text-red-500">
                              {formik.errors.description}
                            </p>
                          ) : null}
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">
                            App Instruction
                          </p>
                          <Textarea
                            required
                            id="propmt"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.propmt}
                            width="100%"
                            placeholder="Now is the optimal workflow for frontend teams. All-in-one: Static and JAMstack deployment, Serverless Functions, and Global CDN."
                          />
                          <p className="text-xs text-gray-400">
                            Instructions need to be clear, unambiguous, and
                            logical. Let ChatGpt be your little helper.{" "}
                            <a
                              href="https://github.com/f/awesome-chatgpt-prompts"
                              target={"_blank"}
                            >
                              See Example
                            </a>
                          </p>
                          {formik.touched.propmt === true &&
                          formik.errors.propmt !== null ? (
                            <p className="text-xs p-1 text-red-500">
                              {formik.errors.propmt}
                            </p>
                          ) : null}
                        </div>
                        <div>
                          {" "}
                          <Input
                            required
                            id="example_input"
                            value={formik.values.example_input}
                            onChange={formik.handleChange}
                            placeholder="I love you three tousand times"
                            onBlur={formik.handleBlur}
                            width={"100%"}
                          >
                            Example input
                          </Input>
                          {formik.touched.example_input === true &&
                          formik.errors.example_input !== null ? (
                            <p className="text-xs p-1 text-red-500">
                              {formik.errors.example_input}
                            </p>
                          ) : null}
                        </div>
                        <div>
                          <p className="text-sm leading-3 text-gray-400">
                            Make it private?
                          </p>
                          <Toggle onChange={(e) => setPvt(e.target.checked)} />
                        </div>
                        <Spacer />
                        {error !== null ? (
                          <Note type="error">{error}</Note>
                        ) : null}

                        <div className="flex items-center justify-end">
                          <Button
                            onClick={() => formik.handleSubmit()}
                            typeof="submit"
                            disabled={!formik.isValid}
                            loading={loading}
                          >
                            Test
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </section>
              </Card>
            </Grid>
          </Grid.Container>
        </div>
      </div>

      <style jsx>{`
        .page__wrapper {
          background-color: ${theme.palette.accents_1};
          min-height: calc(100vh - 172px);
        }
        .page__content {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 100%;
          margin: 0 auto;
          padding: calc(${theme.layout.unit} * 2) ${theme.layout.pageMargin};
          box-sizing: border-box;
        }
        .actions-stack {
          display: flex;
          width: 100%;
        }
        .actions-stack :global(.input-wrapper) {
          background-color: ${theme.palette.background};
        }
        .actions-stack :global(input) {
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

export default NewApp;
