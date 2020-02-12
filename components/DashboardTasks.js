import { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";

const DashboardTasks = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='mt-5'>
      <h5>This is a div that will render all of the tasks as cards</h5>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Task Name</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            Level of Priority
          </Card.Subtitle>
          <Card.Text>Assigned or Unassigned</Card.Text>
          <Button variant='danger'>Claim Task</Button>
          <Button variant='primary' onClick={handleShow}>
            View Details
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container'>
            <div className='row'>Project Description will go here</div>
            <div className='row'>Level of Priority</div>
            <div className='row'>Due Date</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='danger' onClick={handleClose}>
            Claim Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashboardTasks;
