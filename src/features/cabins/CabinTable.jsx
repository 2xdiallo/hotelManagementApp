// import { useQueries, useQuery } from "@tanstack/react-query";
// import styled from "styled-components";
// import getCabins  from "../../services/apiCabins";
// import CabinRow from "./CabinRow";
// import Spinner from "../../ui/Spinner"
// import useCabins from "./useCabins";

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

// function CabinTable() {
//   const {isLoading, cabins, isError} = useCabins();

// if(isLoading )return <Spinner/>
//   if(isError) return <p>Error...</p>

//   return <Table role="table">
//     <TableHeader role="row">
//       <div></div>
//     <div>Cabin</div>
//     <div>Capacity</div>
//     <div>Price</div>
//     <div>Discount</div>
//     <div></div>
    


//     </TableHeader>
//     {
//       cabins.map(cabin=>{
//         return <CabinRow cabin={cabin} key={cabin.id} />
//       })
      
//     }

//   </Table>;
// }

// export default CabinTable;
