//This Will need to take in a click event that triggers a function NewProject that changes the state to update it with new Team Members.
import NPLayout from "../components/NPLayout";
import { Form } from "react-bootstrap";
import { useState } from "react";

const FormIndividualTeam = props => {
  const [collaborators, setCollaborators] = useState();
  return (
    <NPLayout>
      <div className='row mt-5'>
        <div className='col-md-12 mx-auto'>
          <h2>{props.name} Collaborators</h2>
          <div className='row'>
            <div className='col-md-8'>
              <Form>
                <label htmlFor='Collaborator'>Name of Collaborator:</label>
                <input
                  type='text'
                  name='Collaborator'
                  className='form-control'
                  placeholder='Collaborator'
                />
                <br />
                <button>Add Collaborator to {props.name}</button>
                <br />
                <button>Finalize Tasks Added</button>
              </Form>
            </div>
            <div className='col-md-4'>
              <p>
                This is where Team Member names will show up as you type them
                in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </NPLayout>
  );
};

export default FormIndividualTeam;
