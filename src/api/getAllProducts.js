import { API_URL } from "../constants/api";
import axios from "axios";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/productsList`);

    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
};
