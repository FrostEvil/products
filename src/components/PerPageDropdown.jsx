import React, { useEffect, useRef, useState } from "react";
import DropdownPanel from "./DropdownPanel";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

function PerPageDropdown({ perPageOptions, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const divEl = useRef();

  const pagePartUrl = location.search.slice(
    location.search.indexOf("?"),
    location.search.indexOf("?") + 7
  );

  const perPagePartUrl = location.search.slice(
    location.search.indexOf("&"),
    location.search.indexOf("&") + 11
  );

  const padding = "true";

  const handleClick = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setIsOpen(!isOpen);
    onChange(option);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!divEl) return;

      if (!divEl.current.contains(e.target)) setIsOpen(false);
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const renderPageOptions = perPageOptions.map((option) => {
    const pageUrl =
      location.pathname + pagePartUrl + "1" + perPagePartUrl + option;

    return (
      <DropdownPanel onClick={() => handleOptionClick(option)} key={option}>
        <PerPageLink to={pageUrl}>{option}</PerPageLink>
      </DropdownPanel>
    );
  });

  return (
    <DropDownWrapper ref={divEl}>
      <DropdownPanel $padding={padding} onClick={handleClick}>
        {value || "Select product per page:"}
      </DropdownPanel>
      {isOpen && renderPageOptions}
    </DropDownWrapper>
  );
}

const DropDownWrapper = styled.div`
  margin-top: 24px;
`;

const PerPageLink = styled(Link)`
  padding: 12px;
  display: inline-block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: ${(props) => props.theme.colors.text};
`;

export default PerPageDropdown;
