import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <Header />
      <Title>
        Welcome to our shop! <br />
        Expand yourself...
      </Title>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </>
  );
}

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 43px);
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
`;

export default HomePage;
