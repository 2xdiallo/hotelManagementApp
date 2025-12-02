import { useQuery } from "@tanstack/react-query";
import getCabins from "../../services/apiCabins";

export default function useCabins(){

    const {isLoading,data:cabins,isError} = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
    return {isLoading, cabins, isError};
}