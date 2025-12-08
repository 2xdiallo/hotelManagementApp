import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
 
 const queryClient = useQueryClient();

  const {mutate:createCabin, isLoading: isCreating,} = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("New Cabin created successfully");
    },
    onError: (err) => {
      toast.error(err.message || "An error occurred");
    },
  });   // Your implementation here
    return { createCabin, isCreating };
}