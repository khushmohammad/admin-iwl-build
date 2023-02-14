import React from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

const ProfessionalModal = ({show,heading,onHide}) => {
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
          <Row>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Professional Skill</Form.Label>
                <Form.Control type="text" placeholder="Enter skill name"/>
              </Form.Group>
            </Col>
            <Col sm={6}>
            <Form.Group>
                <Form.Label>Company/Org. Name</Form.Label>
                <Form.Control type="text" placeholder="Enter company/org. name"/>
              </Form.Group>
            </Col>
          </Row>
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

export default ProfessionalModal