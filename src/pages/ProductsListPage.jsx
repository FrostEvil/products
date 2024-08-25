import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { getProductsByPage } from "../api/getProductsByPage";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import PerPageDropdown from "../components/PerPageDropdown";
import ContentWrapper from "../components/ContentWrapper";

function ProductsListPage() {
  const [products, setProducts] = useState([]);
  const [allPages, setAllPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [perPageSelection, setPerPageSelection] = useState(null);
  const [searchParams] = useSearchParams();

  const page = searchParams.get("_page");
  const perPage = searchParams.get("_per_page");

  const perPageOptions = [2, 4, 5, 10];

  const handleSelect = (option) => setPerPageSelection(option);

  useEffect(() => {
    (async () => {
      const response = await getProductsByPage(page, perPage);
      setProducts(response.data);
      setAllPages(response.pages);
      setIsLoading(false);
    })();
  }, [page, perPage]);

  const renderedProducts = products.map((product) => {
    return <ProductCard product={product} key={product.id} />;
  });

  return (
    <>
      <Header />
      <ContentWrapper>
        <ProductsListTitle>Product List</ProductsListTitle>
        <TableContent>
          {isLoading ? (
            <WaitingMessage>Loading...</WaitingMessage>
          ) : (
            <ListTable>
              <ListHead>
                <ListTr>
                  <ListTh>Title</ListTh>
                  <ListTh>Price</ListTh>
                  <ListTh>Category</ListTh>
                  <ListTh>Rating</ListTh>
                </ListTr>
              </ListHead>
              <ListBody>{renderedProducts}</ListBody>
            </ListTable>
          )}
        </TableContent>
        <PaginationContent>
          <Pagination allPages={allPages} page={page} />
          <PerPageDropdown
            perPageOptions={perPageOptions}
            value={perPageSelection}
            onChange={handleSelect}
          />
        </PaginationContent>
      </ContentWrapper>
      <Footer />
    </>
  );
}

const ProductsListTitle = styled.h2`
  padding-top: 100px;
  display: flex;
  justify-content: center;
  width: 100%;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.xl};
  text-transform: uppercase;
`;

const TableContent = styled.div`
  display: flex;
  justify-content: center;
`;

const Div = styled.div`
  min-height: calc(100vh - 140px);
`;
const ListTable = styled.table`
  margin: 48px 0;
  width: 100%;
  justify-self: center;
  border-collapse: collapse;
  border: 2px solid ${(props) => props.theme.colors.border};
  font-size: ${(props) => props.theme.fontSizes.lg};
  letter-spacing: 1px;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.lg};
`;

const ListHead = styled.thead`
  & tr:nth-of-type(1) {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const ListBody = styled.tbody`
  & tr:nth-of-type(even) {
    background-color: ${(props) => props.theme.colors.tertiary};
  }
`;

const ListTr = styled.tr`
  color: ${(props) => props.theme.colors.highlightText};
  text-transform: uppercase;
`;

const ListTh = styled.th`
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 10px;
`;

const PaginationContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
`;

const WaitingMessage = styled.p`
  margin: 24px 0;
  font-size: ${(props) => props.theme.fontSizes.xl};
  color: ${(props) => props.theme.colors.text};
`;

export default ProductsListPage;
