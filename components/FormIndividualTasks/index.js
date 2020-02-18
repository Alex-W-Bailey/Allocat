import NPLayout from "../NPLayout";
import { Form } from "react-bootstrap";
import { useState } from "react";

//This Will need to take in a click event that triggers a function NewProject that changes the state to update it with new Team Members.

const FormIndividualTasks = props => {
  const [tasks, setTasks] = useState({});

  const handleTask = () => {
    console.log("handle task");
    //This will take in the value from the task input
    //as well as the priority level, due date, and description
    // it needs to be passed to state.
  };

  return (
    <NPLayout>
      <div className='row mt-5'>
        <div className='col-md-12 mx-auto'>
          <h2>Add Tasks for {props.name} to Complete</h2>

          <div className='row'>
            <div className='col-md-8'>
              <Form>
                <label htmlFor='TaskName'>
                  Name of Tasks for {props.name}:
                </label>
                <input
                  type='text'
                  name='TaskName'
                  className='form-control'
                  placeholder='Task Name'
                />
                <br />
                <label htmlFor='Collaborator'>Description of Task:</label>
                <input
                  type='text'
                  name='TaskDescription'
                  className='form-control'
                  placeholder='Task Description'
                />
                <br />
                <label htmlFor='Collaborator'>Due Date (MM/DD/YY): </label>
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
};

export default FormIndividualTasks;
