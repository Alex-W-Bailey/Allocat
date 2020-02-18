import { Accordion, Card, Button } from "react-bootstrap";

const DashboardTeams = props => {
  return (
    <div className='mt-5'>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant='link' eventKey='0'>
              Backend (Team 1)
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey='0'>
            <Card.Body>
              <Accordion>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                      Alex Baily
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey='0'>
                    <Card.Body>Passport.js</Card.Body>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey='0'>
                    <Card.Body>Next.js</Card.Body>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey='0'>
                    <Card.Body>Create Schema</Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant='link' eventKey='1'>
                      Rico Quintanilla
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey='1'>
                    <Card.Body>Routing</Card.Body>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey='1'>
                    <Card.Body>Passport.js</Card.Body>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey='1'>
                    <Card.Body>Next.js</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant='link' eventKey='1'>
              Frontend
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey='1'>
            <Card.Body>
              <Accordion>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                      Danielle Burrage
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey='0'>
                    <Card.Body>SASS</Card.Body>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey='0'>
                    <Card.Body>Projects Card</Card.Body>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey='0'>
                    <Card.Body>Create Schema</Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant='link' eventKey='1'>
                      Monica Dixon
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey='1'>
                    <Card.Body>React.js</Card.Body>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey='1'>
                    <Card.Body>Bootstrap-React</Card.Body>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey='1'>
                    <Card.Body>Dashboard</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default DashboardTeams;
