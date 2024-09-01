import { API_URL } from "../constants/api";
import axios from "axios";

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/productsList/${id}`);
    return response.data;
  } catch (error) {
    return {
      message: "Something went wrong, product was not removed.",
    };
  }
};
