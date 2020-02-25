import NavDropdown from "../NavDropdown";
import Axios from "axios";

const Nav = props => {
  let loggedOut = false;
  let loggedIn = false;

  if (props.pageTitle === "Register" || props.pageTitle === "Login") {
    loggedOut = true;
    loggedIn = false;
  } else {
    loggedOut = false;
    loggedIn = true;
  }

  return (
    <React.Fragment>
      <nav className='nav navbar-light'>
        <div className='row'>
          <a className='navbar-brand ml-3 test' href='/projects'>
            <img className='nav-logo' src='/allocat_blue.png' alt='Allocat logo' />
          </a>
        </div>
        <div className='row'>
          {loggedIn ? (<h1 className='welcome-title my-auto'>Welcome person</h1>) : (<h1></h1>)}
        </div>

        <h3 className='mx-auto text-center font-weight-bold'>
          {props.pageTitle}
        </h3>

        <NavDropdown menuItems={props.menuItems} pageTitle={props.pageTitle} />
        <div></div>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
