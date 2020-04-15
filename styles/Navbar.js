import styled from 'styled-components'

export const Navbar = styled.div`
  background: ${props => props.theme.colors.background1};
  border-bottom: 1px solid ${props => props.theme.colors.border1};
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


