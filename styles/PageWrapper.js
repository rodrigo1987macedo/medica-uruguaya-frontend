import styled from 'styled-components'

export const PageWrapper = styled.div`
  background: ${props => props.theme.colors.background2};
  min-height: 100vh;
  > div {
    padding: 32px 150px 14px 150px;
  }
`;

