import { useField } from "formik";
import styled from "styled-components";

function FormSelect({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <SelectWrapper>
      <Label>{label}</Label>
      <Select {...field} {...props} />
      {meta.error && meta.touched && <ErrorMsg>{meta.error}</ErrorMsg>}
    </SelectWrapper>
  );
}

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  font-size: ${(props) => props.theme.fontSizes.base};
`;

const Label = styled.label`
  font-weight: 600;
`;

const Select = styled.select`
  padding: 8px;
  min-width: 300px;
  border-radius: 4px;
  font-size: ${(props) => props.theme.fontSizes.base};
`;

const ErrorMsg = styled.p`
  color: ${(props) => props.theme.colors.error};
`;

export default FormSelect;
