import ListGroup from "react-bootstrap";

const MobileDashNav = props => {
  return (
    <div className='row mobile-task-nav'>
      <ListGroup>
        <ListGroup.Item>
          <a onClick={() => props.updateCategory("teams")}>Teams</a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a onClick={() => props.updateCategory("tasks")}>Tasks</a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a onClick={() => props.updateCategory("timeline")}>Timeline</a>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};
export default MobileDashNav;
