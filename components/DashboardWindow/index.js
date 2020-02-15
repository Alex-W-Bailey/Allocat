import DBLayout from "../DashboardLayout";
import DashboardTeams from "../DashboardTeams";
import DashboardTimeline from "../DashboardTimeline";
import DashboardTasks from "../DashboardTasks";

const DashboardWindow = props => {
  if (props.categorySelescted === "teams") {
    console.log;
  }
  return (
    <div className='col-md-10 mt-5'>
      <DBLayout>
        <DashboardTeams teams={props.teams} />
        <DashboardTasks tasks={props.tasks} />
        <DashboardTimeline timeline={props.timeline} />
      </DBLayout>
    </div>
  );
};

export default DashboardWindow;
