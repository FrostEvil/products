import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import { DeleteContext } from "../context/DeleteContext";

function DeleteModal() {
  const { isOpen, message, handleDeleteAprroved, handleDeleteRejected } =
    useContext(DeleteContext);

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
          <ModalContext>
            <ModalText>
              {message ? message : "Do you want to remove this product?"}
            </ModalText>
            <ButtonsWrapper>
              {message ? (
                <ModalButton onClick={() => handleDeleteRejected()}>
                  close
                </ModalButton>
              ) : (
                <>
                  <ModalButton onClick={() => handleDeleteRejected()}>
                    no
                  </ModalButton>
                  <ModalButton onClick={() => handleDeleteAprroved()}>
                    yes
                  </ModalButton>
                </>
              )}
            </ButtonsWrapper>
          </ModalContext>
          <ModalBackground />
        </>
      ) : null}
    </>,
    document.getElementById("portal")
  );
}

const ModalContext = styled.div`
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

const ButtonsWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-around;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  transition: all 0.3s;
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 4px 8px;
  }
`;

export default DeleteModal;
