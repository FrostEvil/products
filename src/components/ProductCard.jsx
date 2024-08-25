import styled from "styled-components";

function ProductCard({ product }) {
  return (
    <ListTr>
      <ListTd>{product.title}</ListTd>
      <ListTd>{product.price.toFixed(2)}€</ListTd>
      <ListTd>{product.category}</ListTd>
      <ListTd>{product.rating.rate}</ListTd>
    </ListTr>
  );
}

const ListTr = styled.tr``;
const ListTd = styled.td`
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 10px;
`;

export default ProductCard;
