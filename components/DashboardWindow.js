import DBLayout from "../components/DBLayout";
import DashboardTeams from "../components/DashboardTeams";
import DashboardTimeline from "../components/DashboardTimeline";
import DashboardTasks from "../components/DashboardTasks";

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
