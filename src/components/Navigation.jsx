import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

function Navigation() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  //toglowanie nawigacji open/close
  const handleToggleMobileNav = () => setIsMobileNavOpen(!isMobileNavOpen);

  //zamkniecie nawgacji jesli klikniemy w link
  const handleCloseMobileNav = (e) => {
    if (e.target.tagName === "A") {
      setIsMobileNavOpen(false);
    }
  };

  //zablokowanie scrolowania przy otwartej nawigacji
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.setAttribute("style", "overflow:hidden");
    }

    return () => document.body.setAttribute("style", "overflow:unset");
  }, [isMobileNavOpen]);

  return (
    <>
      <Nav $isopen={isMobileNavOpen}>
        <NavUl onClick={handleCloseMobileNav}>
          <NavLi>
            <NavLink to="/">Home</NavLink>
          </NavLi>
          <NavLi>
            <NavLink to="/products?_page=1&_per_page=5">Product List</NavLink>
          </NavLi>
          <NavLi>
            <NavLink to="/products/add_product">Add Product</NavLink>
          </NavLi>
        </NavUl>
      </Nav>
      <BurgerWrapper>
        <BurgerNavButton onClick={handleToggleMobileNav}>
          <CloseBurderNav $isopen={isMobileNavOpen} />
          <OpenBurgerNav $isopen={isMobileNavOpen} />
        </BurgerNavButton>
      </BurgerWrapper>
    </>
  );
}

const Nav = styled.nav`
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: end;
  transition: all 0.5s;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: absolute;
    justify-content: center;
    height: 100vh;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    transform: ${(props) =>
      props.$isopen ? "translateX(0)" : "translateX(100%)"};
  }
`;

const NavUl = styled.ul`
  width: 40%;
  display: flex;
  justify-content: space-evenly;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 60%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const NavLi = styled.li`
  list-style: none;
`;

const NavLink = styled(Link)`
  padding: 4px;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  text-decoration: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const BurgerWrapper = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    width: 100%;
    height: 49.6px;
    background-color: white;
  }
`;

const BurgerNavButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background-color: transparent;
`;

const CloseBurderNav = styled(RxCross2)`
  height: 1.6rem;
  width: 1.6rem;
  display: ${(props) => (props.$isopen ? "flex" : "none")};
`;
const OpenBurgerNav = styled(IoMdMenu)`
  height: 1.6rem;
  width: 1.6rem;
  display: ${(props) => (props.$isopen ? "none" : "flex")};
`;

export default Navigation;
