import { Card } from "react-bootstrap";

const DashboardTimeline = () => {
  return (
    <div className='mt-5'>
      <h5>
        This is a div that will render all the tasks in the order they are due
        (if we get there)
      </h5>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Task</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            Person assigned
          </Card.Subtitle>
          <Card.Text>When it's due</Card.Text>
          <Card.Link href='#'>Mark As Completed</Card.Link>
          <Card.Link href='#'>Delete</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashboardTimeline;
