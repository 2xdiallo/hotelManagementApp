import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import getCabins from "../services/apiCabins";
// import CabinTable from "../features/cabins/CabinTable"
// import CreateCabinForm from "../features/cabins/CreateCabinForm";
// import Button from "../ui/Button";
// import { useForm } from "react-hook-form";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableV2 from "../features/cabins/CabinTableV2";

function Cabins() {
  const [cabins, setCabins] = useState();




  useEffect(() => {
    getCabins().then(data=>{
      console.log(data)
      setCabins(data)
    })
   
  }, []);
  return (<>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>Filter</p>
      
    </Row>
    <Row>
      <CabinTableV2/>
   <AddCabin/>
    </Row>
      </>
  );
}

export default Cabins;
