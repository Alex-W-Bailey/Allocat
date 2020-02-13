// This will be the dropdown for the Nav Bar. Evenually it will change depending on where in the website the user is.
// Currently its not functioning becuase I think we do not have bootstrap Jquery/Javascript properly linked.
import { Dropdown } from "react-bootstrap";
const NavDropdown = props => {
  return (
    <Dropdown className='dropdown'>
      <Dropdown.Toggle variant='success' id='dropdown-basic'>
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
        <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
        <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default NavDropdown;
