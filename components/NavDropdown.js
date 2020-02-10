// This will be the dropdown for the Nav Bar. Evenually it will change depending on where in the website the user is.
// Currently its not functioning becuase I think we do not have bootstrap Jquery/Javascript properly linked.
const NavDropdown = props => {
  return (
    <div className='dropdown'>
      <button
        className='btn btn-secondary dropdown-toggle'
        type='button'
        id='dropdownMenuButton'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
      >
        Dropdown button
      </button>
      <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
        <a className='dropdown-item' href='#'>
          Something 1
        </a>
        <a className='dropdown-item' href='#'>
          Something 2
        </a>

        <a className='dropdown-item' href='#'>
          "Something 3"
        </a>
      </div>
    </div>
  );
};
export default NavDropdown;
