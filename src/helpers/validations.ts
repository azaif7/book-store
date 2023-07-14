import * as Yup from "yup";

export const bookValidation = Yup.object().shape({
  name: Yup.string().required("Book name is required"),
  price: Yup.string()
    .required("Book price is required")
    .matches(/^[0-9]+$/, "Only numeric values are allowed"),
  category: Yup.string().required("Book category is required"),
  description: Yup.string().required("Book category is required"),
});
