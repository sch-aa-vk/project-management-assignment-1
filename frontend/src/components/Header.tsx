import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../store/hooks/useAppSelector";
import { isAuthenticatedSelector } from "../store/selectors/authSelectors";
import { Popconfirm } from "antd";
import useAppDispatch from "../store/hooks/useAppDispatch";
import { ContentWrapper } from "./ContentWrapper";

const HeaderContainer = styled.header`
  background-color: #282c34;
  padding: 1rem 0;
  color: white;
  margin-bottom: 2rem;
  width: 100%;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
`;

const Link = styled.a`
  color: white;
  text-decoration: none;
`;

const Nav = styled.nav``;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  margin-left: 2rem;

  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  background-color: #ff4b5c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-left: 2rem;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #ff1f3a;
  }
`;

const Header: React.FC = () => {
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch({ type: "auth/logout" });
  };

  return (
    <HeaderContainer>
      <ContentWrapper justifyContent="space-between">
        <Logo>
          <Link href="/">Banking System</Link>
        </Logo>
        <Nav>
          {isAuthenticated ? (
            <>
              <NavLink href="/account">Account Management</NavLink>
              <Popconfirm
                title="Are you sure you want to logout?"
                onConfirm={handleLogout}
                okText="Yes"
                cancelText="No"
              >
                <LogoutButton>Logout</LogoutButton>
              </Popconfirm>
            </>
          ) : (
            <>
              <NavLink href="/signup">Sign Up</NavLink>
              <NavLink href="/login">Login</NavLink>
            </>
          )}
        </Nav>
      </ContentWrapper>
    </HeaderContainer>
  );
};

export default Header;
