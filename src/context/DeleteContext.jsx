import { createContext, useState } from "react";
import { deleteProduct } from "../api/deleteProduct";

export const DeleteContext = createContext(null);

export const DeleteContextPorvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [productToDeleteId, setProductToDeleteId] = useState("");

  const handleDelateProduct = (id) => {
    setProductToDeleteId(id);
    setIsOpen(true);
  };
  const handleDeleteAprroved = async () => {
    const result = await deleteProduct(productToDeleteId);
    if (result.id) {
      setMessage("");
      setIsOpen(false);
      window.location.reload();
    } else {
      setMessage(result.message);
    }
  };

  const handleDeleteRejected = () => setIsOpen(false);

  return (
    <DeleteContext.Provider
      value={{
        isOpen,
        message,
        handleDelateProduct,
        handleDeleteAprroved,
        handleDeleteRejected,
      }}
    >
      {children}
    </DeleteContext.Provider>
  );
};
