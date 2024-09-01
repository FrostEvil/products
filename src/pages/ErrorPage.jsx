import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";

function ErrorPage() {
  return (
    <>
      <Header />
      <ErrorMsg>Page not found</ErrorMsg>
      <Footer />
    </>
  );
}

const ErrorMsg = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 43px);
  width: 100%;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.error};
`;

export default ErrorPage;
