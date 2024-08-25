import styled from "styled-components";
import ContentWrapper from "../components/ContentWrapper";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AddProductForm from "../components/AddProductForm";

function AddProductPage() {
  return (
    <>
      <Header />
      <ContentWrapper>
        <AddProductPageTitle>add product</AddProductPageTitle>
        <AddProductForm />
      </ContentWrapper>
      <Footer />
    </>
  );
}

const AddProductPageTitle = styled.h2`
  padding-top: 64px;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.xl};
  text-transform: uppercase;
`;

export default AddProductPage;
