// This is the layout that will be formatted for the Project Dashboard. Each Project will have its own
const NewCollaborator = props => {
  return (
    <div>
      <label htmlFor='collaboratorEmail'>New Collaborator</label>
      <input
        type='email'
        name='collaboratorEmail'
        className='form-control'
        id='collaboratorEmail'
        placeholder='Collaborator Email'
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  );
};

export default NewCollaborator;
