import { Card } from "react-bootstrap";

const DashboardTasks = () => {
  return (
    <div className='mt-5'>
      <h5>This is a div that will render all of the tasks as cards</h5>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Task Name</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            Level of Priority
          </Card.Subtitle>
          <Card.Text>Due Date</Card.Text>
          <Card.Link href='#'>Claim Task</Card.Link>
          <Card.Link href='#'>Details</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashboardTasks;
