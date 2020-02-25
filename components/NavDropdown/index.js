import { Dropdown } from "react-bootstrap";
import axios from "axios";

const NavDropdown = props => {
  let register = false;
  let login = false;
  let loggedIn = false;

  if (props.pageTitle === "Register") {
    register = true;
    login = false;
    loggedIn = false;
  } else if (props.pageTitle === "Login") {
    register = false;
    login = true;
    loggedIn = false;
  } else {
    register = false;
    login = false;
    loggedIn = true;
  }
  return (
    <Dropdown className='mr-3' alignRight>
      <Dropdown.Toggle
        classname='dropdown-toggle'
        drop='left'
      ></Dropdown.Toggle>

      <Dropdown.Menu className='dd-menu'>
        {loggedIn ? <Dropdown.Item href="/" onClick={() => {
          console.log("clicked logout");
          axios.get("/api/logout").then(() => {
            console.log("loggedOut")
          });
        }}>Logout</Dropdown.Item> : <h1></h1>}
        {register ? <Dropdown.Item href='/'>Login</Dropdown.Item> : <h1></h1>}
        {login ? (
          <Dropdown.Item href='/register'>Register</Dropdown.Item>
        ) : (
          <h1></h1>
        )}
        {props.menuItems ? (
          props.menuItems.map(item => {
            return (
              <Dropdown.Item key={item.id} href={item.link}>
                {item.title}
              </Dropdown.Item>
            );
          })
        ) : (
          <h1></h1>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default NavDropdown;
