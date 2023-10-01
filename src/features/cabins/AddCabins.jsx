import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

const AddCabins = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onClose = () => setIsOpenModal(false);

  return (
    <>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        {isOpenModal ? "Hide Form" : "Show Form"}
      </Button>
      {isOpenModal && (
        <Modal onClose={onClose}>
          <CreateCabinForm onCloseModal={onClose} type="modal" />
        </Modal>
      )}
    </>
  );
};

export default AddCabins;
