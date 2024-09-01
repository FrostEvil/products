import styled from "styled-components";

function DropdownPanel({ children, padding, ...rest }) {
  return (
    <Panel padding={padding} {...rest}>
      {children}
    </Panel>
  );
}
const Panel = styled.div`
  padding: ${(props) => (props.$padding ? "12px" : 0)};
  min-width: 180px;
  width: 100%;
  border: 1px solid black;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    padding: ${(props) => (props.$padding ? "4px" : 0)};
  }
`;

export default DropdownPanel;
