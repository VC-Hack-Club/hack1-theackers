import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
function App() {
  const [open, setOpen] = React.useState(true);
  window._debug = {
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false),
  } 
  return(
    <>
    <Modal isOpen={open} toggle={() => setOpen(false)}>
    <ModalHeader>
      Modal title
    </ModalHeader>
    <ModalBody>
      Modal body text goes here.
    </ModalBody>
  </Modal>
  <button type="button" className="btn btn-primary" onClick={()=>setOpen(true)}>odsfjo</button>
  </>
  );
  
}

export default App;
