import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useEditcabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditingCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin succesfully edited!");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditingCabin, editCabin };
}
