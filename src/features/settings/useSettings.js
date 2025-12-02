import { getSettings } from "../../services/apiSettings";
import { useQuery } from "@tanstack/react-query";

export default function useSettings() {
  // Placeholder for future settings logic
  const {data, isLoading ,error } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  return { settings: data, isLoading, error };
}   