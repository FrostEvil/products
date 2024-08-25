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
`;

export default DropdownPanel;
