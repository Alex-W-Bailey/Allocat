import NPLayout from "./NPLayout";

//This Will need to take in a click event that triggers a function NewProject that changes the state to update it with new Team Members.

const FormTeam = (teams, project) => {
  console.log("teams: " + teams);
  return teams && teams.length ? (
    teams.map(team => {
      <NPLayout>
        <div className='container'>
          <div className='row mt-5'>
            <div className='col-md-12 mx-auto'>
              <h2>
                {team.name} Collaborators for {project}
              </h2>
              <div className='row'>
                <div className='col-md-8'>
                  <form>
                    <label htmlFor='Collaborator'>Name of Collaborator:</label>
                    <input
                      type='text'
                      name='Collaborator'
                      className='form-control'
                      id='Collaborator'
                      placeholder='Collaborator'
                    />
                    <br />
                    <button>Add Collaborator to Team 1</button>
                    <br />
                    <button>Continue on To Team 2</button>
                  </form>
                </div>
                <div className='col-md-4'>
                  <p>
                    This is where Team Member names will show up as you type
                    them in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NPLayout>;
    })
  ) : (
    <p className='text-center'>Create project teams to add Collaborators</p>
  );
};

export default FormTeam;
