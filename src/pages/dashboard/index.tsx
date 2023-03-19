import React from "react";
import { Button, Grid, Input, Note, Spacer, useTheme } from "@geist-ui/react";
import SearchIcon from "@geist-ui/react-icons/search";
import { AppCard } from "@/components";
import { useRouter } from "next/router";
import { useFetch } from "@/hooks/useFetch";
import { useFetchUser } from "@/hooks/useFetchUser";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const theme = useTheme();

  const { loading, error, apps } = useFetch();
  const { user } = useFetchUser();

  return (
    <>
      <div className="page__wrapper">
        <div className="page__content">
          {user && user.license_key === null ? (
            <>
              <Note width={"100%"} type="warning">
                Please enter your license key{" "}
                <Link href={"/dashboard/settings"}>here</Link>
              </Note>
              <Spacer />
            </>
          ) : null}
          <div className="actions-stack">
            <Input
              scale={1.25}
              width="100%"
              icon={<SearchIcon color={theme.palette.accents_5} />}
              placeholder="Search..."
            />
            <Button
              onClick={() => router.push("/dashboard/new")}
              auto
              type="secondary"
              marginLeft={1}
            >
              New Project
            </Button>
          </div>
          <Grid.Container gap={2} marginTop={1} justify="flex-start">
            {apps.map((app) => (
              <Grid xs={24} sm={12} md={8}>
                <AppCard
                  name={app.name}
                  description={app.description}
                  demoInput={app.demoInput}
                  icon={app.icon}
                  propmt={app.propmt}
                  slug={app.slug}
                  usedCount={app.usedCount}
                />
              </Grid>
            ))}
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
export default Page;
