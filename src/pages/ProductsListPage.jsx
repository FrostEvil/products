import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { getProductsByPage } from "../api/getProductsByPage";
import { getSortProducts } from "../api/getSortProducts";
import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductCardMobile from "../components/ProductCardMobile";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import PerPageDropdown from "../components/PerPageDropdown";
import ContentWrapper from "../components/ContentWrapper";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { ModalContext } from "../context/ModalContext";

function ProductsListPage() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [allPages, setAllPages] = useState(0);
  const [sortingLinkTo, setSortingLinkTo] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [isSortResponseOk, setIsSortResponseOk] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [perPageSelection, setPerPageSelection] = useState(null);
  const [searchParams] = useSearchParams();

  const { openModal, isOpen } = useContext(ModalContext);

  const page = searchParams.get("_page");
  const perPage = searchParams.get("_per_page");

  const perPageOptions = ["2", "4", "5", "10", "50"];

  const config = [
    {
      label: "Title",
      isSortable: false,
    },
    {
      label: "Price",
      isSortable: true,
      sortTag: "price",
    },
    {
      label: "Category",
      isSortable: false,
    },
    {
      label: "Rating",
      isSortable: true,
      sortTag: "rating.rate",
    },
    {
      label: "Actions",
      isSortable: false,
    },
  ];

  const handleSelect = (option) => setPerPageSelection(option);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      if (!sortOrder) {
        const result = await getProductsByPage(page, perPage);
        if (result.data) {
          setProducts(result.data);
          setAllPages(result.pages);
          setIsSortResponseOk(true);
        } else if (result.message) {
          setIsSortResponseOk(false);
          openModal(result.message);
        }
      }

      if (sortOrder && sortBy) {
        const result = await getSortProducts(sortBy, sortOrder, page, perPage);
        if (result.data) {
          setProducts(result.data);
          setIsSortResponseOk(true);
        } else if (result.message) {
          setIsSortResponseOk(false);
          openModal(result.message);
        }
      }

      setIsLoading(false);
    })();
  }, [page, perPage, sortOrder, sortBy]);

  const setSorting = (label) => {
    if (sortBy && label !== sortBy) {
      setSortOrder("asc");
      setSortBy(label);
      setSortingLinkTo(
        `${location.pathname}?_page=1&_per_page=${perPage}&_sort=${label}&desc`
      );
    } else {
      if (sortOrder === null) {
        setSortOrder("asc");
        setSortBy(label);
        setSortingLinkTo(
          `${location.pathname}?_page=1&_per_page=${perPage}&_sort=${label}&desc`
        );
      } else if (sortOrder === "asc") {
        setSortOrder("desc");
        setSortBy(label);

        setSortingLinkTo(`${location.pathname}?_page=1&_per_page=${perPage}`);
      } else if (sortOrder === "desc") {
        setSortOrder(null);
        setSortBy(null);
        setSortingLinkTo(
          `${location.pathname}?_page=1&_per_page=${perPage}&_sort=${label}&asc`
        );
      }
    }
  };

  const renderedProducts = products.map((product) => {
    return <ProductCard product={product} key={product.id} />;
  });

  const renderedProductsOnMobile = products.map((product) => {
    return <ProductCardMobile product={product} key={product.id} />;
  });

  function getIcons(sortTag, sortBy, sortOrder) {
    if (sortTag !== sortBy || !isSortResponseOk) {
      return (
        <>
          <GoChevronUp />
          <GoChevronDown />
        </>
      );
    } else if (isSortResponseOk) {
      if (sortOrder === null) {
        return (
          <>
            <GoChevronUp />
            <GoChevronDown />
          </>
        );
      } else if (sortOrder === "asc") {
        return <GoChevronUp />;
      } else if (sortOrder === "desc") {
        return <GoChevronDown />;
      }
    }
  }

  const renderedHeader = config.map((headline) => {
    if (!headline.isSortable) {
      return <ListTh key={headline.label}>{headline.label}</ListTh>;
    } else {
      return (
        <ListTh
          key={headline.sortTag}
          onClick={() => setSorting(headline.sortTag)}
        >
          <SortingLink
            to={
              headline.sortTag === sortBy
                ? sortingLinkTo
                : `${location.pathname}?_page=1&_per_page=${perPage}&_sort=${headline.sortTag}&asc`
            }
          >
            <ListThSortingContent>
              <ListThSortingIcons>
                {getIcons(headline.sortTag, sortBy, sortOrder)}
              </ListThSortingIcons>
              {headline.label}
            </ListThSortingContent>
          </SortingLink>
        </ListTh>
      );
    }
  });

  const renderedMobileHeader = config.map((headline) => {
    if (!headline.isSortable) {
      return;
    } else {
      return (
        <SortingLink
          to={
            sortingLinkTo ||
            `${location.pathname}?_page=1&_per_page=${perPage}&_sort=${headline.sortTag}&desc`
          }
          key={headline.sortTag}
          onClick={() => setSorting(headline.sortTag)}
        >
          <ListThSortingContent>
            <ListThSortingIcons>
              {getIcons(headline.sortTag, sortBy, sortOrder)}
            </ListThSortingIcons>
            {headline.label}
          </ListThSortingContent>
        </SortingLink>
      );
    }
  });

  return (
    <>
      <Header />
      <ContentWrapper>
        <ProductsListTitle>Products List</ProductsListTitle>
        <TableContent>
          {isLoading ? (
            <WaitingMessage>Loading...</WaitingMessage>
          ) : (
            <ListTable>
              <ListHead>
                <ListTr>{renderedHeader}</ListTr>
              </ListHead>
              <ListBody>{renderedProducts}</ListBody>
            </ListTable>
          )}
        </TableContent>

        <MobileProductsContext>
          <SortingContext>{renderedMobileHeader}</SortingContext>
          {renderedProductsOnMobile}
        </MobileProductsContext>

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
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-top: 60px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const TableContent = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    margin: 0 16px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const ListTable = styled.table`
  margin: 48px 0;
  width: 100%;
  justify-self: center;
  border-collapse: collapse;
  border: 2px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

const ListHead = styled.thead`
  & tr:nth-of-type(1) {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ListBody = styled.tbody`
  & tr:nth-of-type(even) {
    background-color: ${({ theme }) => theme.colors.tertiary};
  }
`;

const ListTr = styled.tr`
  color: ${({ theme }) => theme.colors.highlightText};
  text-transform: uppercase;
`;

const ListTh = styled.th`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 10px;
`;

const ListThSortingContent = styled.div`
  display: flex;
  align-items: center;
`;

const ListThSortingIcons = styled.div`
  margin-right: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PaginationContent = styled.div`
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const WaitingMessage = styled.p`
  margin: 24px 0;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
`;

const SortingLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

// MOBILE

const MobileProductsContext = styled.div`
  margin-top: 24px;
  display: none;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
  }
`;

const SortingContext = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
  margin-bottom: 8px;
`;

export default ProductsListPage;
