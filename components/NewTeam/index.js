// This is the layout that will be formatted for the Project Dashboard. Each Project will have its own
const NewTeam = props => {
    var teamNum = `teamName${props.elementNum}`;

    return (
        <div>
            <label htmlFor={teamNum}>Team Name {props.elementNum}</label>
            <input
                type='text'
                name={teamNum}
                className='form-control'
                id={teamNum}
                placeholder='Team Name'
                onChange={props.handleChange}
            />
            <br />      
        </div>
    );
};

export default NewTeam;
