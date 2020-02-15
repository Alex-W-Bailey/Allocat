import DBLayout from "../DashboardLayout";
import DashboardTeams from "../DashboardTeams";
import DashboardTimeline from "../DashboardTimeline";
import DashboardTasks from "../DashboardTasks";

const DashboardWindow = props => {
  if (props.categorySelected === "teams") {
    return (
      <div className='col-md-10 mt-5'>
        <DBLayout>
          <DashboardTeams teams={props.teams} />
        </DBLayout>
      </div>
    );
  } else if (props.categorySelected === "tasks") {
    return (
      <div className='col-md-10 mt-5'>
        <DBLayout>
          <DashboardTasks tasks={props.tasks} />
        </DBLayout>
      </div>
    );
  } else if (props.categorySelected === "timeline") {
    return (
      <div className='col-md-10 mt-5'>
        <DBLayout>
          <DashboardTeams timeline={props.timeline} />
        </DBLayout>
      </div>
    );
  } else {
    return (
      <div className='col-md-10 mt-5'>
        <DBLayout>
          <div className='col-md-10 mt-5 text-center'>Select a Category</div>
        </DBLayout>
      </div>
    );
  }
};

export default DashboardWindow;
