import { API_URL } from "../constants/api";
import axios from "axios";

export const editProduct = async (editedProduct) => {
  try {
    const response = await axios.patch(
      `${API_URL}/productsList/${editedProduct.id}`,
      editedProduct
    );
    return response.data;
  } catch (error) {
    return {
      message: "Editing product failed.",
    };
  }
};
