import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

function Pagination({ allPages, page }) {
  const location = useLocation();

  const pagePartUrl = location.search.slice(
    location.search.indexOf("?"),
    location.search.indexOf("?") + 7
  );

  const perPagePartUrl = location.search.slice(location.search.indexOf("&"));

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

  return <PaginationWrapper>{renderedPages}</PaginationWrapper>;
}

const PaginationWrapper = styled.div`
  margin-top: 24px;
  padding: 8px 0;
  display: flex;
  justify-content: center;
  column-gap: 24px;
`;

const PageLink = styled(Link)`
  align-self: center;
  text-decoration: none;
`;

const PageText = styled.p`
  font-size: ${(props) => props.theme.fontSizes.lg};
  color: ${(props) => props.theme.colors.text};
`;

const PageTextHighlight = styled.p`
  font-size: ${(props) => props.theme.fontSizes.xl};
  color: ${(props) => props.theme.colors.highlightText};
`;

export default Pagination;
