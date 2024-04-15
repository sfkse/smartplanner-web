"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// Create a navbar component with styled-components. There should be logo on the left , links aligned left right after logo and user menu on the right.
// User menu should be avatar and dropdown with logout button.
import styled from "styled-components";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <NavbarContainer>
      <Wrapper>
        <Logo>TIMEX</Logo>
        <Links>
          <MenuLink pathname={pathname} href="/">
            DASHBOARD
          </MenuLink>
          <MenuLink pathname={pathname} href="/plan/overview">
            PLANERING
          </MenuLink>
          <MenuLink pathname={pathname} href="/settings/classes">
            INSTÄLLNINGAR
          </MenuLink>
        </Links>
      </Wrapper>
      <UserMenu>
        <Avatar src="https://avatar.iran.liara.run/public" alt="avatar" />
        {/* <Dropdown>
          <Button>Logout</Button>
        </Dropdown> */}
      </UserMenu>
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

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Dropdown = styled.div`
  position: relative;
`;

const Button = styled.button`
  color: var(--secondary-light);
  border: none;
  cursor: pointer;
`;

