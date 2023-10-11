import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "./useGetBooking";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { useDeleteBooking } from "./useDeleteBooking";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";

import styled from "styled-components";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking } = useGetBooking();
  const moveBack = useMoveBack();
  const { isCheckingOut, checkOut } = useCheckOut();
  const { isDeletingBooking, deleteBooking } = useDeleteBooking();

  if (isLoading) return <Spinner />;

  const { status, id: bookingId } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          {status === "checked-in" && (
            <Button
              onClick={() => checkOut(bookingId)}
              disabled={isCheckingOut}
              icon={<HiArrowUpOnSquare />}
            >
              Check out
            </Button>
          )}
          <Modal.Open opens="delete">
            <Button variation="danger" disabled={isDeletingBooking}>
              Delete Booking
            </Button>
          </Modal.Open>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeletingBooking}
            onConfirm={() => {
              deleteBooking(bookingId, {
                onSettled: moveBack,
              });
            }}
          ></ConfirmDelete>
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
