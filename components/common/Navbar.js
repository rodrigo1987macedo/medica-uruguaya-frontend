import React from "react";
import styled from 'styled-components'

const NavbarWrapper = styled.div`
  background: ${props => props.theme.colors.background1};
  border-bottom: 1px solid ${props => props.theme.colors.border1};
  padding: 25px 150px 12px 150px;
  > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  > div:nth-child(2) {
    margin: 28px 0 0 0;
  }
  > div img {
    width: 260px;
  }
`;

function Navbar({ children }) {
  return (
    <NavbarWrapper>
      {children}
    </NavbarWrapper>
  );
}

export default Navbar;
