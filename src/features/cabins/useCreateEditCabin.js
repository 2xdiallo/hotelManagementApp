import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin edited successfully"
        // `Cabin ${isEditSession ? "edited" : "created"} successfully`
      );
      
    },
    onError: (err) => {
      toast.error(err.message || "An error occurred");
    },
  });

  return { editCabin, isEditing };
}
