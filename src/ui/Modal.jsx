import { cloneElement } from "react";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const ModalButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

/*
Creating a portal for the modal so that it gets
rendered outside the root yet being at the same place 
in the component tree so that we can pass props easily
without breaking the code
*/

const ModalContext = createContext({});

const Modal = ({ children }) => {
  const [modalName, setModalName] = useState("");

  const close = () => setModalName("");
  const open = setModalName;

  return (
    <ModalContext.Provider value={{ modalName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens }) => {
  const { open } = useContext(ModalContext);
  return <>{cloneElement(children, { onClick: () => open(opens) })}</>;
};

/*
We are cloning the children of Window because we need to pass the 
onCloseModal prop as that defines the styling on the form in the 
CreateCabinForm function and also enables closing of the form once 
the cabin is updated or added
*/

const Window = ({ children, name }) => {
  const { modalName, close } = useContext(ModalContext);

  if (modalName !== name) return null;
  return createPortal(
    <Overlay onClick={close}>
      <StyledModal>
        <ModalButton onClick={close}>
          <HiXMark />
        </ModalButton>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
