import { API_URL } from "../constants/api";
import axios from "axios";

export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/productsList/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
};
