import { useState } from "react";
import NPLayout from "../components/NPLayout";
import { Form } from "react-bootstrap";
import { Card, Modal, Button } from "react-bootstrap";

const DashboardTasks = () => {
  const [showForm, setShowForm] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // if (showForm) {
  //   console.log("this works");
  // }

  if (showForm) {
    return (
      <NPLayout>
        <div className='row mt-5'>
          <div className='col-md-12 mx-auto'>
            <h2>Add Tasks to Complete</h2>

            <div className='row'>
              <div className='col-md-8'>
                <Form>
                  <label htmlFor='TaskName'>Name of Tasks:</label>
                  <input
                    type='text'
                    name='TaskName'
                    className='form-control'
                    placeholder='Task Name'
                  />
                  <br />
                  <label htmlFor='TaskName'>Description of Task:</label>
                  <input
                    type='text'
                    name='TaskDescription'
                    className='form-control'
                    placeholder='Task Description'
                  />
                  <br />
                  <label htmlFor='TaskName'>
                    Which Team is This a Task For?
                  </label>
                  <input
                    type='text'
                    name='Team'
                    className='form-control'
                    placeholder='Team Name'
                  />
                  <br />
                  <label htmlFor='TaskName'>Due Date (MM/DD/YY): </label>
                  <input
                    type='text'
                    name='Due Date'
                    className='form-control'
                    placeholder='02/29/20'
                  />
                  <br />
                  <Form.Group>
                    <Form.Label>Priority Level</Form.Label>
                    <Form.Control as='select'>
                      <option>High Priority</option>
                      <option>Medium Priority</option>
                      <option>Low Priority</option>
                    </Form.Control>
                  </Form.Group>
                  <br />
                  <button>Add Task</button>
                  <br />
                  <button>Continue on To Team 2 Tasks</button>
                </Form>
              </div>
              <div className='col-md-4'>
                <p>This is where Tasks will show up</p>
              </div>
            </div>
          </div>
        </div>
      </NPLayout>
    );
  } else {
    return (
      <div className='mt-5'>
        <h5>This is a div that will render all of the tasks as cards</h5>

        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Create a New Task</Card.Title>
            <Card.Text>Assigned or Unassigned</Card.Text>
            <Button variant='primary' onClick={() => setShowForm(true)}>
              Create a New Task
            </Button>
          </Card.Body>
        </Card>

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
  }
};

export default DashboardTasks;
