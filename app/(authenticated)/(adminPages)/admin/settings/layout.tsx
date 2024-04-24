"use client";

import React from "react";
import SecondaryNavbar from "@/app/(authenticated)/ui/SecondaryNavbar";
import styled from "styled-components";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settingsMenu = [
    { name: "KLASSER", href: "/admin/settings/classes" },
    { name: "KURSER", href: "/admin/settings/lessons" },
    { name: "LÄRARE", href: "/admin/settings/users" },
    { name: "TIMPLANER", href: "/admin/settings/timeplans" },
    { name: "ADMINS", href: "/admin/settings/admins" },
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

