import NavDropdown from "./NavDropdown";

const Nav = props => {
  return (
    <nav className='nav navbar-light bg-light'>
      <a className='navbar-brand ml-3 test' href='/'>
        Logo Goes Here
      </a>
      <h3 className='mx-auto text-center font-weight-bold'>
        {props.pageTitle}
      </h3>

      <NavDropdown menuItems={props.menuItems} />
      <div></div>
    </nav>
  );
};

export default Nav;
