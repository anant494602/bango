import React from 'react';
import Button from 'react-bootstrap/Button';
import GoogleMapComponent from '../utils/GoogleMapComponent';
import Modal from 'react-bootstrap/Modal';

const ModalComponent = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Give Your address to continue...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <GoogleMapComponent />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default ModalComponent;
  
