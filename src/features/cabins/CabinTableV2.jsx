import { useQueries, useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import getCabins from "../../services/apiCabins";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import { fi } from "date-fns/locale";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination"

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: scroll;
//   max-height: 60vh;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   position: sticky;
//   top: 0;
//   z-index: 10;
//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTableV2() {
  const { isLoading, cabins, isError } = useCabins();
  const [searchParam] = useSearchParams();
  const filterValue = searchParam.get("discount") || "all";

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error...</p>;
  if (!cabins || cabins.length === 0) return <Empty resourceName={"Cabins"} />;

// console.log(filterValue)
//1- filter cabins based on the filter value
  const filteredCabins = (cabins || []).filter((cabin) => {
    if(filterValue==="no-discount"){
     return cabin.discount<=0
    }
     if(filterValue==="with-discount"){
      return cabin.discount>0
    }
   
      return true
    
  })
  // console.log(filteredCabins)

  

  //2 - Sort
const sortBy = searchParam.get("sortBy") || "startDate-asc";
const [field, direction] = sortBy.split("-");
const modifier = direction === "asc" ? 1 : -1;

const sortedCabins = filteredCabins.sort(
  (a, b) => (a[field] - b[field]) * modifier
);
  
 

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={sortedCabins}
        render={(cabin) => {
          return <CabinRow cabin={cabin} key={cabin.id} />;
        }}
      />
      
    </Table>
  );
}

export default CabinTableV2;
