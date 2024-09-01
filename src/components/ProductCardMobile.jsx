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
    <CardWrapper>
      <CardTitle>{product.title}</CardTitle>
      <CardDataWrapper>
        <CardData>Price: {product.price}€</CardData>
        <CardData>Rating: {product.rating.rate}/5.0</CardData>
      </CardDataWrapper>
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
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.tertiary};
`;
const CardTitle = styled.h3`
  padding: 6px;
  background-color: ${({ theme }) => theme.colors.highlightText};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
`;
const CardDataWrapper = styled.div`
  padding: 8px 0;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
`;
const CardData = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ActionIconWrapper = styled.div`
  padding: 8px 0;
  margin-bottom: 2px;
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  justify-content: space-evenly;
  align-content: center;

  & svg {
    height: 1.2rem;
    width: 1.2rem;
  }
`;

export default ProductCard;
