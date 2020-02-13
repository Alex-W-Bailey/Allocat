import FormIndividualTeam from "../components/FormIndividualTeam";

//This function detects whether teams exist yet, and creates a form to add collaborators to each team
const FormTeam = props => {
  const teamArray = props.teamObj;
  return teamArray.length ? (
    teamArray.map(team => {
      return <FormIndividualTeam key={team.id} name={team.name} />;
    })
  ) : (
    <p className='text-center'>Create project teams to add Collaborators</p>
  );
};
export default FormTeam;
