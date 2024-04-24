"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// Create a navbar component with styled-components. There should be logo on the left , links aligned left right after logo and user menu on the right.
// User menu should be avatar and dropdown with logout button.
import styled from "styled-components";
import UserMenu from "./UserMenu";

type NavbarProps = {
  type?: "admin" | "nonAdmin";
};
const Navbar = (props: NavbarProps) => {
  const pathname = usePathname();

  const menuItems =
    props.type === "admin"
      ? [
          { name: "DASHBOARD", href: "/admin" },
          { name: "PLANERING", href: "/admin/plan/overview" },
          { name: "INSTÄLLNINGAR", href: "/admin/settings/classes" },
        ]
      : [
          { name: "HOME", href: "/" },
          { name: "REQUEST", href: "/request" },
        ];

  return (
    <NavbarContainer>
      <Wrapper>
        <Logo>TIMEX</Logo>
        <Links>
          {menuItems.map((item) => (
            <MenuLink key={item.name} pathname={pathname} href={item.href}>
              {item.name}
            </MenuLink>
          ))}
        </Links>
      </Wrapper>
      <UserMenuWrapper>
        {/* <Avatar src="https://avatar.iran.liara.run/public" alt="avatar" /> */}
        <UserMenu />
      </UserMenuWrapper>
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 2rem;
  background-color: var(--primary-dark);
  color: var(--secondary-dark);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
  height: 100%;
`;

const MenuLink = styled(Link)<{ pathname: string }>`
  text-decoration: none;
  color: ${(props) =>
    props.pathname === props.href
      ? "var(--secondary-light)"
      : "var(--secondary-dark)"};

  font-weight: ${(props) =>
    props.pathname === props.href ? "bold" : "normal"};
  &:hover {
    color: var(--secondary-light);
    font-weight: bold;
  }
`;

const UserMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Dropdown = styled.div`
  position: relative;
`;

const Button = styled.button`
  color: var(--secondary-light);
  border: none;
  cursor: pointer;
`;

