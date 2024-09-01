import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import EditProductForm from "../components/EditProductForm";
import { getProduct } from "../api/getProduct";
import ContentWrapper from "../components/ContentWrapper";
import styled from "styled-components";
import Footer from "../components/Footer";

function EditProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      const response = await getProduct(id);
      setProduct(response);
    })();
  }, []);

  return (
    <>
      <Header />
      <ContentWrapper>
        <EditProductPageTitle>Edit product</EditProductPageTitle>
        <EditProductForm product={product} />
      </ContentWrapper>
      <Footer />
    </>
  );
}

const EditProductPageTitle = styled.h2`
  padding-top: 64px;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  text-transform: uppercase;
`;
export default EditProductPage;
