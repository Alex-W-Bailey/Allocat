// This will be the dropdown for the Nav Bar. Evenually it will change depending on where in the website the user is.
// Currently its not functioning becuase I think we do not have bootstrap Jquery/Javascript properly linked.
import { Dropdown } from "react-bootstrap";
const NavDropdown = props => {
  return (
    <Dropdown className='mr-3' alignRight>
      <Dropdown.Toggle
        classname='dropdown-toggle'
        drop='left'
      ></Dropdown.Toggle>

      <Dropdown.Menu className='dd-menu'>
        {/* Switch statement for the first item of the dropdown. If user is logged in, first item will be logout. --- Set this to default
           If pageTitle= "Login",  option will be "Register New Account". if pagetitle="Register"  option will be Login to existing account*/}
        <Dropdown.Item href='/'>Logout</Dropdown.Item>

        {/* Takes in state of parent page - for teach menuItem, it takes in the name, and the link it wants to go to. Figure out how to */}
        {/* 
        {props.menuItems.map(item => (
          <Dropdown.Item key={item.id} href={item.href}>
            {item.name}
          </Dropdown.Item>
        ))} */}
        <Dropdown.Item className='dropdown-item' href='/register'>
          Register
        </Dropdown.Item>
        <Dropdown.Item href='/projects'>Projects</Dropdown.Item>
        <Dropdown.Item href='/newProject'>New Project</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default NavDropdown;
