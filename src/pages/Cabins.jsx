import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import getCabins from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable"
// import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
// import { useForm } from "react-hook-form";
import CreateCabinFormV2 from "../features/cabins/CreateCabinFormV2";

function Cabins() {
  const [cabins, setCabins] = useState();
  const [showForm, setShowForm] = useState(false);




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
      
      {/* {cabins && cabins.map((cabin) => {
        return  <ul key={cabin.id}>
          <li>{cabin.id}</li>
          <li>{cabin.name}</li>
          <li><img src={cabin.image} alt="" /></li>
        </ul>;
      })} */}
    </Row>
    <Row>
      <CabinTable/>
      <Button variant="primary" onClick={()=>setShowForm((show)=>{
        return !show
      }) }>Add new cabin</Button>
    {showForm && <CreateCabinFormV2/>}
    </Row>
      </>
  );
}

export default Cabins;
