import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const LanguageModal = ({show,heading,onHide}) => {
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
        <Form>
          <Form.Label>Select Language</Form.Label>
          <Form.Select>
            <option>Select Language...</option>
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
            <option>Arabi</option>
          </Form.Select>
        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button onClick={onHide} variant="outline-primary">Close</Button>
          <Button>Save</Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default LanguageModal