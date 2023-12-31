import { Box } from "@mui/material";
import Head from "next/head";
import { FC } from "react";
import { Navbar, Sidebar } from "../ui";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ title = "Open Jira", children }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />

      <Box padding="10px 20px">{children}</Box>
    </Box>
  );
};
