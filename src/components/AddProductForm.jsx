import { useContext } from "react";
import { Form, Formik } from "formik";
import { basicSchema } from "../schemas/basicSchema";
import { addNewProduct } from "../api/addNewProduct";
import styled from "styled-components";
import { ModalContext } from "../context/ModalContext";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

function AddProductForm() {
  const { openModal } = useContext(ModalContext);

  //obsluga dodawania produktu
  const handleSubmit = async (values, actions) => {
    const result = await addNewProduct(values);
    if (result.id) {
      openModal("Product added succesfully!");
    } else if (result.message) {
      openModal(result.message);
    }
    actions.resetForm();
  };

  return (
    <FormWrapper>
      <Formik
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: "",
          rating: {
            rate: "",
            count: "",
          },
        }}
        validationSchema={basicSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormComponent>
            <FormInput
              label="Title"
              name="title"
              type="text"
              placeholder="Enter title"
            />
            <FormInput
              label="Price"
              name="price"
              type="number"
              placeholder="Enter price"
            />
            <FormInput
              label="Description"
              name="description"
              type="text"
              placeholder="Enter description"
            />
            <FormSelect
              label="Select category"
              name="category"
              placeholder="Please select a category"
            >
              <option value="">Please select a category</option>
              <option value="men's clothing">Men's clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">Electronics</option>
              <option value="women's clothing">Women's clothing</option>
            </FormSelect>
            <FormInput
              label="Rate"
              name="rating.rate"
              type="number"
              placeholder="Enter rate (0-5)"
            />
            <FormInput
              label="Count"
              name="rating.count"
              type="number"
              placeholder="Enter count"
            />

            <SubmitButton disabled={isSubmitting} type="submit">
              Submit
            </SubmitButton>
          </FormComponent>
        )}
      </Formik>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 16px 24px;
    margin-bottom: 16px;
  }
`;

const FormComponent = styled(Form)`
  padding: 32px 50px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 18px;
  background-color: ${({ theme }) => theme.colors.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 16px 24px;
  }
`;

const SubmitButton = styled.button`
  padding: 8px;
  min-width: 300px;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.highlightText};
  background-color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

export default AddProductForm;
