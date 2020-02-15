import FormIndvidualTask from "../FormIndividualTasks";

const FormTasks = props => {
  const teamArray = props.teamObj;
  return teamArray.length ? (
    teamArray.map(team => {
      return <FormIndvidualTask key={team.id} name={team.name} />;
    })
  ) : (
      <p className='text-center'>Create project teams to add tasks</p>
    );
};

export default FormTasks;
