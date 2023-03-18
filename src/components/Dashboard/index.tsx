import React from "react";
import { Button, Grid, Input, useTheme } from "@geist-ui/react";
import SearchIcon from "@geist-ui/react-icons/search";
import { useRouter } from "next/router";

const SearchApp = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between">
      <Input
        scale={1.25}
        width="100%"
        icon={<SearchIcon color={"white"} />}
        placeholder="Search..."
      />
      <Button onClick={() => router.push("/dashboard/new")} auto marginLeft={1}>
        New App
      </Button>
    </div>
  );
};

export default SearchApp;
