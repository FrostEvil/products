import styled from "styled-components";
import { FaEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DeleteContext } from "../context/DeleteContext";

function ProductCard({ product }) {
  const { handleDelateProduct } = useContext(DeleteContext);

  return (
    <ListTr>
      <ListTd>{product.title}</ListTd>
      <ListTd>{product.price.toFixed(2)}€</ListTd>
      <ListTd>{product.category}</ListTd>
      <ListTd>{product.rating.rate}</ListTd>
      <ListTd>
        <ActionIconWrapper>
          <Link to={`/products/${product.id}`}>
            <FaEye />
          </Link>
          <Link to={`/products/${product.id}/edit`}>
            <MdModeEdit />
          </Link>
          <Link onClick={() => handleDelateProduct(product.id)}>
            <MdDelete />
          </Link>
        </ActionIconWrapper>
      </ListTd>
    </ListTr>
  );
}

const ListTr = styled.tr``;
const ListTd = styled.td`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

const ActionIconWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default ProductCard;
