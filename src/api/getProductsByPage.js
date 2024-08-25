import { API_URL } from "../constants/api";
import axios from "axios";

export const getProductsByPage = async (page, perPage) => {
  try {
    const response = await axios.get(
      `${API_URL}/productsList?_page=${page}&_per_page=${perPage}`
    );

    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
};
