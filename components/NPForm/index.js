import NPLayout from "../NPLayout/index";
import NewTeam from "../NewTeam/index";
import NewCollaborator from "../NewCollaborator/index";
import FormMessage from "../FormMessage/index";

const NPForm = props => {
  var isOnPage1 = props.pageNum === 0;
  var isOnPage2 = props.pageNum === 1;
  var isOnPage3 = props.pageNum === 2;

  var isError = props.isError;
  var errorMsg = props.errorMsg;
  var errorPage = props.errorPage;
  var isSuccess = props.isSuccess;
  var successMsg = props.successMsg;
  var successPage = props.successPage;

  return (
    <div>
      {isOnPage1 ? (
        <NPLayout>
          <div className='row'>
            <div className='col-md-12'>
              <h2 className='text-center'>Project Info</h2>
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
              </form>
            </div>
            <button onClick={() => props.handleNextPage()}>Next</button>
          </div>
          <div className='row justify-center'>
            {isError ? (
              errorPage === 0 ? (
                <FormMessage status='error' message={props.errorMsg} />
              ) : (
                <h1></h1>
              )
            ) : (
              <h1></h1>
            )}
          </div>
        </NPLayout>
      ) : isOnPage2 ? (
        <NPLayout>
          <div className='row'>
            <div className='col-md-12'>
              <h2 className='text-center'>Project Teams</h2>
              {props.numberOfTeams.map((team, index) => {
                var i = parseInt(index);
                var elementNum = i + 1;

                return (
                  <NewTeam
                    elementNum={elementNum}
                    handleChange={props.handleTeamNameChange}
                  />
                );
              })}

              <button type='button' onClick={() => props.handleNewTeam()}>
                Add Another Team
              </button>
              <br />
              <button onClick={() => props.handleLastPage()}>Last</button>
              <button onClick={() => props.handleNextPage()}>Next</button>
            </div>
          </div>

          <div className='row mx-auto justify-center'>
            {isError ? (
              errorPage === 1 ? (
                <FormMessage status='error' message={props.errorMsg} />
              ) : (
                <h1></h1>
              )
            ) : (
              <h1></h1>
            )}
          </div>
        </NPLayout>
      ) : (
        <NPLayout>
          <h2 className='text-center'>Project Collaborators</h2>
          <NewCollaborator
            value={props.collaboratorEmail}
            handleChange={props.handleChange}
          />
          {props.foundCollaborator ? (
            <p>{props.collaboratorName}</p>
          ) : props.searchedForCollaborator ? (
            <p>No user found...</p>
          ) : (
            <p></p>
          )}
          <button type='button' onClick={() => props.handleCollabSearch()}>
            Search
          </button>
          <button
            type='button'
            onClick={() => props.handleAddNewCollaborator()}
          >
            Add
          </button>
          <br />
          <button onClick={() => props.handleLastPage()}>
            <span class='glyphicon glyphicon-triangle-left' />
            Back
          </button>
          <br />
          <div className='justify-center row mx-auto'>
            <button className='cp-btn' onClick={() => props.handleNewProject()}>
              Create Project
            </button>
          </div>
          <div className='row justify-center'>
            {isError ? (
              errorPage === 2 ? (
                <FormMessage status='error' message={props.errorMsg} />
              ) : (
                <h1></h1>
              )
            ) : (
              isSuccess ? (
                <FormMessage status="success" message={props.successMsg} />
              ) : (
                <h1></h1>
              )
            )}
          </div>
        </NPLayout>
      )}
    </div>
  );
};

export default NPForm;
