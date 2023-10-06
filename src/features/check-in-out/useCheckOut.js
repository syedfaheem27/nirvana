import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
  const queryClient = useQueryClient();
  const { isLoading: isCheckingOut, mutate: checkOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} succesfully checked-out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error(`An error occurred while checking out!`);
    },
  });

  return { isCheckingOut, checkOut };
}
