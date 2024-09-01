import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import DropdownPanel from "./DropdownPanel";

function PerPageDropdown({ perPageOptions, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const divEl = useRef();
  //pocięcie URLa
  const pagePartUrl = location.search.slice(
    location.search.indexOf("?"),
    location.search.indexOf("?") + 7
  );
  const perPagePartUrl = location.search.slice(
    location.search.indexOf("&"),
    location.search.indexOf("&") + 11
  );
  // nadanie paddingu dla styli w rozwijalnym dropdown, rozwiazanie dosc naciagane ale nie zmienialem
  const padding = "true";

  //obsluga otwierania/zamykania dropdown
  const handleClick = () => setIsOpen(!isOpen);

  //wybor ilosci produktow na stronie i przekazanie parametru do rodzica
  const handleOptionClick = (option) => {
    setIsOpen(!isOpen);
    onChange(option);
  };

  // obsluga zamkniecia dropdown jesli klikniemy poza jego obszar
  useEffect(() => {
    const handler = (e) => {
      if (!divEl.current) return;

      if (!divEl.current.contains(e.target)) setIsOpen(false);
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  // wyrenderowanie mozliwych opcji dla dropdown
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
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 0;
  }
`;

const PerPageLink = styled(Link)`
  padding: 12px;
  display: inline-block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 4px;
  }
`;

export default PerPageDropdown;
