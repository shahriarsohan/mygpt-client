import React from "react";
import { Button, Text, Link, Card, useTheme } from "@geist-ui/react";
import { MyGptResponse } from "@/types/myGptResponse";
import { useRouter } from "next/router";

const AppCard: React.FC<MyGptResponse> = ({
  name,
  description,
  icon,
  usedCount,
  slug,
}) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <div className="project__wrapper">
        <Card className="project__card cursor-pointer" shadow>
          {/* <Link href={`/dashboard/details/${slug}`}> */}
          <div className="project-title__wrapper">
            <button className="h-10 mr-2 w-10 flex items-center justify-center rounded bg-gray-800">
              <p className="leading-1">{icon}</p>
            </button>
            <div className="project-title__content">
              <Text
                margin={0}
                style={{ fontWeight: 500, lineHeight: "1.5rem" }}
              >
                {name}
              </Text>
            </div>
          </div>
          {/* </Link> */}

          <div className="project-git-commit">
            <Text
              margin={0}
              style={{ color: theme.palette.accents_6, fontWeight: 500 }}
            >
              {description}
            </Text>
          </div>
          <div className="flex items-center justify-end">
            {/* <ButtonDropdown type="secondary" width={"full"}> */}
            <Button onClick={() => router.push(`/${slug}`)}>Launch</Button>
            {/* </ButtonDropdown> */}
          </div>
        </Card>
      </div>
      <style jsx>{`
        .project__wrapper {
          width: 100%;
        }
        .project__wrapper :global(.project__card) {
          box-shadow: ${theme.type === "dark"
            ? theme.expressiveness.shadowSmall
            : "0px 2px 4px rgba(0,0,0,0.1)"};
        }
        .project__wrapper :global(.project__card):hover {
          box-shadow: ${theme.type === "dark"
            ? `0 0 0 1px ${theme.palette.foreground}`
            : "0px 4px 8px rgba(0,0,0,0.12)"};
        }
        .project-title__wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .project-title__wrapper :global(.project-icon) {
          background: #fff;
          border-radius: 50%;
          border: ${theme.type === "dark"
            ? `1px solid ${theme.palette.foreground}`
            : "none"};
        }
        .project-git-commit,
        .project-git-commit-error {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 3rem;
          margin: 1rem 0;
          font-size: 0.875rem;
        }
        .project-git-commit-error {
          padding: 0 ${theme.layout.unit};
          border-radius: ${theme.layout.radius};
          background: ${theme.palette.accents_1};
          border: 1px solid ${theme.palette.border};
          color: ${theme.palette.accents_5};
        }
      `}</style>
    </>
  );
};

export default AppCard;
