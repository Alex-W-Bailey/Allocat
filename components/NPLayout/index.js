// // New Project (forms) Layout
// const NPstyles = {
//   border: 2,
//   borderradius: 25
// };

const NPLayout = props => {
  return (
    <div className='container mx-auto row'>
      <div className='np-container col-md-10'>{props.children}</div>
    </div>
  );
};

export default NPLayout;
