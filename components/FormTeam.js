import NPLayout from "./NPLayout";
import FormIndividualTeam from "../components/FormIndividualTeam";

//This function detects whether teams exist yet, and creates a form to add collaborators to each team

const FormTeam = props => {
  console.log("teams: " + props.teams);
  return props.teams && props.teams.length ? (
    props.teams.map(team => {
      <NPLayout>
        <FormIndividualTeam key={team.id} name={team.name} />
      </NPLayout>;
    })
  ) : (
    <p className='text-center'>Create project teams to add Collaborators</p>
  );
};
export default FormTeam;
