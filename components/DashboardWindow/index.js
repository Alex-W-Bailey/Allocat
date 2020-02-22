import DBLayout from "../DashboardLayout";
import DashboardTeams from "../DashboardTeams";
import DashboardTimeline from "../DashboardTimeline";
import DashboardTasks from "../DashboardTasks";

const DashboardWindow = props => {
  if (props.categorySelected === "teams") {
    return <DashboardTeams teams={props.teams} />;
  } else if (props.categorySelected === "timeline") {
    return <DashboardTimeline timeline={props.timeline} />;
  } else {
  }
  return <DashboardTasks tasks={props.tasks} />;
};

export default DashboardWindow;
