// New Project (forms) Layout
const NPstyles = {
  border: 2,
  borderradius: 25
};

const NPLayout = props => {
  return (
    <div style={NPstyles} className='container mx-auto row'>
      <div className='col-md-10 mx-auto'>{props.children}</div>
    </div>
  );
};

export default NPLayout;
