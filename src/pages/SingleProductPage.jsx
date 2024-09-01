import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/getProduct";
import Header from "../components/Header";
import ContentWrapper from "../components/ContentWrapper";
import styled from "styled-components";
import Footer from "../components/Footer";

function SingleProductPage() {
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
        <SingleProductWrapper>
          <Title>{`More about: ${product.title}`}</Title>
          <Content>
            <Paragraph>{product.description}</Paragraph>
            <Paragraph>{`Category: ${product.category}`}</Paragraph>
            <Paragraph>{`Price: ${product.price}`}</Paragraph>
            <Paragraph>{`Rate: ${product.rating?.rate} / 5.0`}</Paragraph>
            <Paragraph>{`Count: ${product.rating?.count} pcs`}</Paragraph>
          </Content>
        </SingleProductWrapper>
      </ContentWrapper>
      <Footer />
    </>
  );
}

const SingleProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  margin-top: 64px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  max-width: 500px;
`;

const Content = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  max-width: 500px;
`;
const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.highlightText};
`;

export default SingleProductPage;
