import styled from "styled-components";
import Navigation from "./Navigation";

function Header() {
  return (
    <HeaderWrapper>
      <Navigation />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  width: 100%;
  padding: 12px 0;
  background-color: ${({ theme }) => theme.colors.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0;
  }
`;

export default Header;
