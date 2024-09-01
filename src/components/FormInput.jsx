import { useField } from "formik";
import styled from "styled-components";
import { boolean, string } from "yup";

function FormInput({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <InputWrapper>
      <Label>{label}</Label>
      <Input
        {...field}
        {...props}
        $error={meta.error}
        $touched={meta.touched}
      />
      {meta.error && meta.touched && <ErrorMsg>{meta.error}</ErrorMsg>}
    </InputWrapper>
  );
}
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
const Label = styled.label`
  font-weight: 600;
`;
const Input = styled.input`
  padding: 8px;
  min-width: 300px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  border: 1px solid
    ${(props) =>
      props.$error && props.$touched
        ? props.theme.colors.error
        : props.theme.colors.border};
`;
const ErrorMsg = styled.p`
  color: ${({ theme }) => theme.colors.error};
`;

export default FormInput;
