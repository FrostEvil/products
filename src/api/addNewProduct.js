import { API_URL } from "../constants/api";
import axios from "axios";

export const addNewProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/productsList`, product);

    return response.data;
  } catch (error) {
    return {
      message: "Adding product failed",
    };
  }
};
