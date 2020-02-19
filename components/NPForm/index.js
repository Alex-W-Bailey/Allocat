import Nav from "../Nav/index"
import NPLayout from "../NPLayout/index";
import NewTeam from "../NewTeam/index";
import NewCollaborator from "../NewCollaborator/index";


const NPForm = props => {
  return (
    <div>
      <Nav pageTitle={props.pageTitle} />
      <NPLayout>
        <div className='row mt-5'>
          <div className='col-md-12 mx-auto'>
            <h2>Project Info</h2>
            <form>
              <label htmlFor='projectName'>Project Name:</label>
              <input
                type='text'
                name='projectName'
                className='form-control'
                id='projectName'
                placeholder='Project Title'
                onChange={props.handleTeamNameChange}
              />
              <label htmlFor='ProjectDescription'>Project Description:</label>
              <input
                type='text'
                name='projectDescription'
                className='form-control'
                rows='5'
                id='projectDescription'
                placeholder='Project Description'
                onChange={props.handleChange}
              />
              <label htmlFor='ProjectDescription'>Project Due Date:</label>
              <input
                type='text'
                name='projectDueDate'
                className='form-control'
                rows='5'
                id='projectDueDate'
                placeholder='02/29/20'
                onChange={props.handleTeamNameChange}
              />
              <br />
              {
                props.numberOfTeams.map((team, index) => {
                  var i = parseInt(index);
                  var elementNum = i + 1;

                  return (
                    <NewTeam
                      elementNum={elementNum}
                      handleChange={props.handleTeamNameChange}
                    />
                  )
                })
              }
              <button type='button' onClick={() => props.handleNewTeam()}>
                Add Another Team
              </button>
              <br />
              <NewCollaborator
                value={props.collaboratorEmail}
                handleChange={props.handleChange}
              />
              {
                props.foundCollaborator ? (
                  <p>{props.collaboratorName}</p>
                ) : props.searchedForCollaborator ? (
                  <p>No user found...</p>
                ) : (
                      <p></p>
                    )
              }
              <button type="button" onClick={() => props.handleCollabSearch()}>
                Search
              </button>
              <button type="button" onClick={() => props.handleAddNewCollaborator()}>
                Add
              </button>
              <br />
              <br />
              <button type='button' onClick={() => props.handleNewProject()}>
                Create Project
              </button>
              { 
                props.isError ? (
                  <h1>{props.errorMsg}</h1>
                ) :
                (
                  <p></p>
                )
              }
            </form>
          </div>
        </div>
      </NPLayout>
    </div>
  );
};

export default NPForm;
