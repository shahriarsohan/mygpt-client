import React from "react";
import {
  Button,
  Card,
  Grid,
  Input,
  Note,
  Spacer,
  useTheme,
} from "@geist-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import authAxios from "@/http/authAxios";

const settings = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);

  const [err, setErr] = React.useState<string | null>(null);
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      api_key: "",
    },
    onSubmit: () => handleUpdateApiKey(),
    validationSchema: Yup.object({
      api_key: Yup.string()
        .required("Please enter your api key")
        .matches(/^sk-[A-Za-z0-9]{48}$/, "Api key must starts with sk"),
    }),
  });

  const handleUpdateApiKey = () => {
    setLoading(true);

    authAxios
      .post(
        "/account/user",
        {
          api_key: formik.values.api_key,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        setSuccess(true);
      })
      .catch(() => {
        setErr("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="page__wrapper">
        <div className="page__content">
          <Grid.Container gap={2} marginTop={1} justify="flex-start">
            <Grid sm={24}>
              <Card width={"100%"}>
                <Input
                  required
                  id="api_key"
                  value={formik.values.api_key}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Api Key"
                  width={"100%"}
                >
                  Enter Api Key
                </Input>
                {formik.touched.api_key === true &&
                formik.errors.api_key !== null ? (
                  <p className="text-xs p-1 text-red-500">
                    {formik.errors.api_key}
                  </p>
                ) : null}
                <Spacer />
                {success ? (
                  <Note type="success">Api key updated successfully</Note>
                ) : null}
                {err ? <Note type="error">Something bad happend</Note> : null}
                <div className="flex items-center justify-end">
                  <Button
                    onClick={() => formik.handleSubmit()}
                    disabled={!formik.isValid}
                    loading={loading}
                  >
                    Submit
                  </Button>
                </div>
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

export default settings;
