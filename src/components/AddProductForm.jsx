import { Field, Form, Formik } from "formik";
import { basicSchema } from "../schemas/basicSchema";
import FormInput from "./FormInput";
import styled from "styled-components";
import FormSelect from "./FormSelect";
import axios from "axios";
import { API_URL } from "../constants/api";
import { useEffect, useState } from "react";
import { getAllProducts } from "../api/getAllProducts";

function AddProductForm() {
  const [post, setPost] = useState([]);
  const [newProductId, setNewProductId] = useState("");

  useEffect(() => {
    (async () => {
      const response = await getAllProducts();
      setNewProductId(response[response.length - 1]["id"] + 1);
    })();

    if (post.length !== 0) {
      (async () => {
        await axios.post(`${API_URL}/productsList`, {
          id: newProductId,
          ...post,
        });
      })();
    }
  }, [post]);

  const handleSubmit = async (values, actions) => {
    setPost(values);
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
`;

const FormComponent = styled(Form)`
  padding: 32px 50px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 18px;
  background-color: ${(props) => props.theme.colors.primary};
`;

const SubmitButton = styled.button`
  padding: 8px;
  min-width: 300px;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s;
  text-transform: uppercase;
  font-size: ${(props) => props.theme.fontSizes.lg};
  border: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.highlightText};
  background-color: ${(props) => props.theme.colors.secondary};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.hover};
  }
`;

export default AddProductForm;
