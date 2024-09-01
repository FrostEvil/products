import React, { useContext, useEffect } from "react";
import { ModalContext } from "../context/ModalContext";
import styled from "styled-components";
import ReactDOM from "react-dom";

function Modal() {
  const { message, isOpen, closeModal } = useContext(ModalContext);

  //zablokowanie scrolowania gdy modal jest wyswietlany
  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute("style", "overflow:hidden");
    }

    return () => document.body.setAttribute("style", "overflow:unset");
  }, [isOpen]);

  return ReactDOM.createPortal(
    <>
      {isOpen ? (
        <>
          <ModalContent>
            <ModalText>{message}</ModalText>
            <CloseModalButton onClick={closeModal}>OK</CloseModalButton>
          </ModalContent>
          <ModalBackground />
        </>
      ) : null}
    </>,
    document.getElementById("portal")
  );
}

const ModalContent = styled.div`
  padding: 40px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 6px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 80%;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.backgorundModal};
  opacity: 0.8;
  z-index: 10;
`;

const ModalText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const CloseModalButton = styled.button`
  padding: 8px 16px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.primary};
  transition: all 0.3s;
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

export default Modal;
