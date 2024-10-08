import styled from "styled-components";

function ContentWrapper({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  min-height: calc(100vh - 43px);
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    padding: 0 16px;
  }
`;

export default ContentWrapper;
