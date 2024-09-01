import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { theme } from "./constants/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components/GlobalStyle";
import ProductsListPage from "./pages/ProductsListPage";
import AddProductPage from "./pages/AddProductPage";
import ErrorPage from "./pages/ErrorPage";
import { ModalContextProvider } from "./context/ModalContext";
import SingleProductPage from "./pages/SingleProductPage";
import EditProductPage from "./pages/EditProductPage";
import { DeleteContextPorvider } from "./context/DeleteContext";
import Modal from "./components/Modal";
import DeleteModal from "./components/DeleteModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/products",
    element: <ProductsListPage />,
  },
  {
    path: "/products/add_product",
    element: <AddProductPage />,
  },
  {
    path: "/products/:id",
    element: <SingleProductPage />,
  },
  {
    path: "/products/:id/edit",
    element: <EditProductPage />,
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DeleteContextPorvider>
      <ModalContextProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Modal />
          <DeleteModal />
          <RouterProvider router={router} />
        </ThemeProvider>
      </ModalContextProvider>
    </DeleteContextPorvider>
  </StrictMode>
);
