import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinFormV2 from "./CreateCabinFormV2";
// import CabinTable from "./CabinTable";


function AddCabin() {
    return (
       <Modal>
        <Modal.Open opens="cabin-form">
            <Button variant="primary">Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
            <CreateCabinFormV2 />
        </Modal.Window>

         {/* <Modal.Open opens="table">
            <Button variant="primary">Show table </Button>
        </Modal.Open>
        <Modal.Window name="table">
            <CabinTable />
        </Modal.Window> */}



       </Modal>
    )
}

export default AddCabin



// function AddCabin() {

//       const [isOpenModal, setIsOpenModal] = useState(false);

//     return (
//         <div>
//                <Button variant="primary" onClick={()=>setIsOpenModal((show)=>{
//         return !show
//       }) }>Add new cabin</Button>
//     {isOpenModal && <Modal onClose={() => setIsOpenModal(false)}><CreateCabinFormV2 onCloseModal={() => setIsOpenModal(false)} /></Modal>}
//         </div>
//     )
// }

// export default AddCabin
