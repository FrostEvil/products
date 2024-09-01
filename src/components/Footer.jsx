import React from "react";
import styled from "styled-components";

function Footer() {
  const x = screen.height;
  return (
    <FooterWrapper>
      <FooterText>CreatedBy @FrostEvil</FooterText>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  padding: 12px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

export default Footer;
