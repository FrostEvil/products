import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Navigation() {
  return (
    <Nav>
      <NavUl>
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
  );
}

const Nav = styled.nav`
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: end;
`;

const NavUl = styled.ul`
  width: 40%;
  display: flex;
  justify-content: space-around;
`;

const NavLi = styled.li`
  list-style: none;
`;

const NavLink = styled(Link)`
  padding: 4px;
  color: ${(props) => props.theme.colors.text};
  text-transform: uppercase;
  text-decoration: none;
`;

export default Navigation;
