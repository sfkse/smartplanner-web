"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styled from "styled-components";

type SecondaryNavbarMenuItem = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

type SecondaryNavbarProps = {
  secondaryMenu: SecondaryNavbarMenuItem[];
};

function SecondaryNavbar(props: SecondaryNavbarProps) {
  const pathname = usePathname();
  console.log(props);
  return (
    <StyledSection>
      <StyledNav>
        {props.secondaryMenu.map((item, index) => (
          <StyledItem key={index}>
            <MenuLink passHref pathname={pathname} href={item.href}>
              {item.name}
            </MenuLink>
            {item.icon && <Icon>{item.icon}</Icon>}
          </StyledItem>
        ))}
      </StyledNav>
    </StyledSection>
  );
}

export default SecondaryNavbar;

const StyledSection = styled.section`
  background-color: var(--secondary-dark);
  border-bottom: 1px solid var(--primary-light-transparent);
  padding: 0 1rem;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-start;
  /* gap: 0.7rem; */
`;

const StyledItem = styled.span`
  font-size: var(--font-size-sm);
  padding: 0.7rem 1rem;
  position: relative;
  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--primary-light-transparent);
    cursor: pointer;

    &:before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      border-bottom: 1px solid var(--primary-dark);
    }
  }
`;

const MenuLink = styled(Link)<{ pathname: string }>`
  text-decoration: none;
  color: ${(props) =>
    props.pathname === props.href
      ? "var(--primary-dark)"
      : "var(--primary-light)"};

  font-weight: ${(props) =>
    props.pathname === props.href ? "bold" : "normal"};

  &:hover {
    color: var(--primary-dark);
  }
`;

const Icon = styled.div`
  margin-left: 0.5rem;
  padding-top: 0.1rem;
`;

