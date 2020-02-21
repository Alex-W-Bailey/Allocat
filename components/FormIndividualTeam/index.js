//This Will need to take in a click event that triggers a function NewProject that changes the state to update it with new Team Members.
import NPLayout from "../NPLayout";
import { Form } from "react-bootstrap";
import { useState } from "react";

const FormIndividualTeam = props => {
  const [collaborators, setCollaborators] = useState([]);

  const handleCollaborator = () => {
    console.log("handle collaborator");
    //This will take in the value from the collaborator form
  };

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
                <label htmlFor='Col-email'>Email:</label>
                <input
                  type='email'
                  name='Col-email'
                  className='form-control'
                  placeholder='joe@schmoe.com'
                />
                <br />
                <button>Add Collaborator to {props.name}</button>

                <br />
                <button>Finalize {props.name} Collaborators</button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </NPLayout>
  );
};

export default FormIndividualTeam;
