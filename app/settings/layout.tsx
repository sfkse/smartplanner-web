"use client";

import React from "react";
import SecondaryNavbar from "@/app/ui/SecondaryNavbar";
import styled from "styled-components";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settingsMenu = [
    { name: "KLASSER", href: "/settings/classes" },
    { name: "KURSER", href: "/settings/lessons" },
    { name: "LÄRARE", href: "/settings/users" },
    { name: "TIMPLANER", href: "/settings/timeplans" },
    { name: "ADMINS", href: "/settings/admins" },
  ];
  return (
    <>
      <SecondaryNavbar secondaryMenu={settingsMenu} />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
}

export default layout;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 3rem;
  padding: 0 2rem;
`;

