import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContentWrapper from "../components/ContentWrapper";
import AddProductForm from "../components/AddProductForm";

function AddProductPage() {
  return (
    <>
      <Header />
      <ContentWrapper>
        <AddProductPageTitle>Add product</AddProductPageTitle>
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
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  text-transform: uppercase;
`;

export default AddProductPage;
