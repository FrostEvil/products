import * as yup from "yup";

const patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

export const basicSchema = yup.object().shape({
  title: yup
    .string()
    .min(4, "The title must contain at least 4 characters ")
    .required("This field is required"),
  price: yup
    .number()
    .positive("Price must be higher than 0")
    .test("is-decimal", `Maximum two digits after comma!`, (val) => {
      if (val != undefined) {
        return patternTwoDigisAfterComma.test(val);
      }
      return true;
    })
    .required("This field is required"),
  description: yup
    .string()
    .min(15, "Descirption must contain at least 15 characters")
    .required("This field is required"),
  category: yup
    .string()
    .oneOf(["men's clothing", "jewelery", "electronics", "women's clothing"])
    .required("This field is required"),
  rating: yup.object().shape({
    rate: yup
      .number()
      .min(0, "Rate must be greater than 0")
      .max(5, "Rate must be less than 5")
      .required("This field is required"),
    count: yup
      .number()
      .positive("Count must be higher than 0")
      .integer("Count must be an integer")
      .required("This field is required"),
  }),
});
