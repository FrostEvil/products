import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

function Pagination({ allPages, page }) {
  const location = useLocation();

  //pocięcie URL na czesci
  const pagePartUrl = location.search.slice(
    location.search.indexOf("?"),
    location.search.indexOf("?") + 7
  );
  const perPagePartUrl = location.search.slice(location.search.indexOf("&"));

  //wyswietlenie linkow dla paginacji stron od 1 do max oraz nadanie im odpowiedniego pageURL
  const array = new Array(allPages).fill(null);
  const renderedPages = array.map((_, index) => {
    const pageUrl =
      location.pathname + pagePartUrl + (index + 1) + perPagePartUrl;

    return (
      <PageLink to={pageUrl} key={index}>
        {+page === index + 1 ? (
          <PageTextHighlight>{index + 1}</PageTextHighlight>
        ) : (
          <PageText>{index + 1}</PageText>
        )}
      </PageLink>
    );
  });

  return (
    <PaginationWrapper>
      {renderedPages.length === 1 ? "" : renderedPages}
    </PaginationWrapper>
  );
}

const PaginationWrapper = styled.div`
  margin-top: 24px;
  padding: 8px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 24px;
  row-gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 12px;
  }
`;

const PageLink = styled(Link)`
  align-self: center;
  text-decoration: none;
`;

const PageText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

const PageTextHighlight = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.highlightText};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

export default Pagination;
