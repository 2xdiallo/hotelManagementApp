import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingsApi} from "../../services/apiSettings";


export default function useUpdateSettings() {   

    const queryClient = useQueryClient();
    const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
      mutationFn: (newSettingsData) => updateSettingsApi(newSettingsData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["settings"] });
        toast.success("Settings updated successfully");
      },
      onError: (err) => {
        toast.error(err.message || "An error occurred");
      },
    });
  
    return { updateSettings, isUpdating };


}