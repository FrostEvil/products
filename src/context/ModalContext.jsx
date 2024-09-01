import { createContext, useState } from "react";

export const ModalContext = createContext(null);

export const ModalContextProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (message) => {
    setMessage(message);
    setIsOpen(true);
  };

  const closeModal = () => {
    setMessage("");
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, message, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
