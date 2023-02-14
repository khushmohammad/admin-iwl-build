import React,{useState} from 'react'
import {Button, ToggleButton, Modal, Form} from 'react-bootstrap';

const RelationModal = ({show,onHide, heading}) => {

  const [checked, setChecked] = useState(false);
  return (
    <>
      
      <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{maxHeight:'300px', overflowY:'auto'}}>
        Modal Body
      </Modal.Body>
      <Modal.Footer>
          <Button onClick={onHide} variant="outline-primary">Close</Button>
          <Button>Save</Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default RelationModal