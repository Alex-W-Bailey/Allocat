import NavDropdown from "../NavDropdown";

const Nav = props => {
  return (
    <nav className='nav navbar-light'>
      <a className='navbar-brand ml-3 test' href='/'>
        <img className='nav-logo' src='/allocat_blue.png' alt='Allocat logo' />
      </a>
      <h3 className='mx-auto text-center font-weight-bold'>
        {props.pageTitle}
      </h3>

      <NavDropdown menuItems={props.menuItems} pageTitle={props.pageTitle} />
      <div></div>
    </nav>
  );
};

export default Nav;
