import NPLayout from "./NPLayout";
import FormIndividualTeam from "../components/FormIndividualTeam";

//This function detects whether teams exist yet, and creates a form to add collaborators to each team
const FormTeam = props => {
  console.log(props + "Line 6");
  const teamArray = props.teamObj;
  console.log(teamArray);
  console.log("teams: " + teamArray[0].name);
  return teamArray.length ? (
    teamArray.map(team => {
      return (
        <NPLayout>
          <FormIndividualTeam key={team.id} name={team.name} />
        </NPLayout>
      );
    })
  ) : (
    <p className='text-center'>Create project teams to add Collaborators</p>
  );
};
export default FormTeam;
