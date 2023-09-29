import { useDeleteCabin } from "./useDeleteCabin";
import { useState } from "react";

import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import CreateCabinForm from "./CreateCabinForm";

import { formatCurrency } from "../../utils/helpers";
import { useCreateCabin } from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const {
    id: cabinId,
    name,
    regularPrice,
    discount,
    image,
    maxCapacity,
    description,
  } = cabin;

  const [showForm, setShowForm] = useState(false);

  //Deleting a cabin
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const { isCreatingCabin, createCabin } = useCreateCabin();

  function duplicateCabinHandler() {
    createCabin({
      name: `copy of ${name}`,
      regularPrice,
      discount,
      image,
      maxCapacity,
      description,
    });
  }

  return (
    <>
      <TableRow>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits upto {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button disabled={isCreatingCabin} onClick={duplicateCabinHandler}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm((show) => !show)}>
            <HiPencil />
          </button>
          <button disabled={isDeleting} onClick={() => deleteCabin(cabinId)}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabin={cabin} />}
    </>
  );
};

export default CabinRow;
