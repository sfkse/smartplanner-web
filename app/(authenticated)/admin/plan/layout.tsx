"use client";

import React from "react";
import SecondaryNavbar from "@/app/(authenticated)/ui/SecondaryNavbar";
import styled from "styled-components";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const secondaryMenu = [
    { name: "OVERVIEW", href: "/plan/overview" },
    { name: "PLAN", href: "/plan/create" },
    { name: "SCHEMA", href: "/plan/schema" },
    {
      name: "CONFLICTS",
      href: "/plan/conflicts",
      icon: <ErrorOutlinedIcon fontSize="small" color="error" />,
    },
  ];
  return (
    <>
      <SecondaryNavbar secondaryMenu={secondaryMenu} />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
}

export default layout;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

