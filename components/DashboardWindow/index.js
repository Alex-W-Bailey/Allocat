import DBLayout from "../DashboardLayout";
import DashboardTeams from "../DashboardTeams";
import DashboardTimeline from "../DashboardTimeline";
import DashboardTasks from "../DashboardTasks";

const DashboardWindow = props => {
  if (props.categorySelected === "teams") {
    return (
      <DashboardTeams teams={props.teams} />
    );
  } else if (props.categorySelected === "tasks") {
    return (
      <DashboardTasks tasks={props.tasks} />
    );
  } else if (props.categorySelected === "timeline") {
    return (
      <DashboardTeams timeline={props.timeline} />
    );
  } else {
    return (
      <div className='col-md-10 mt-5 text-center'>Select a Category</div>
    );
  }
};

export default DashboardWindow;
