import { API_URL } from "../constants/api";
import axios from "axios";

export const getSortProducts = async (sortBy, sortOrder, page, perPage) => {
  try {
    if (sortOrder === "asc") {
      const response = await axios.get(
        `${API_URL}/productsList/?_page=${page}&_per_page=${perPage}&_sort=${sortBy}`
      );
      return response.data;
    }
    if (sortOrder === "desc") {
      const response = await axios.get(
        `${API_URL}/productsList/?_page=${page}&_per_page=${perPage}&_sort=-${sortBy}`
      );
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Sorting products failed",
    };
  }
};
