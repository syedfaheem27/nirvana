import Button from "../../ui/Button";
import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

/*
Here i want the AddCabins component to be concerned only about adding a cabin 
and not managing the isOpenModal state. I want that state to be managed by the 
modal component internally.

So here is the use case for a compound component pattern

*/

// const AddCabins = () => {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   const onClose = () => setIsOpenModal(false);

//   return (
//     <>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         {isOpenModal ? "Hide Form" : "Show Form"}
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={onClose}>
//           <CreateCabinForm onCloseModal={onClose} />
//         </Modal>
//       )}
//     </>
//   );
// };

const AddCabins = () => {
  return (
    <>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Show Form</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>

      <Modal>
        <Modal.Open opens="table">
          <Button>Show Table</Button>
        </Modal.Open>
        <Modal.Window name="table">
          <CabinTable />
        </Modal.Window>
      </Modal>
    </>
  );
};

export default AddCabins;
