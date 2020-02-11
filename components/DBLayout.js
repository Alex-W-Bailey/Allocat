// This is the layout that will be formatted for the Project Dashboard. Each Project will have its own
const RLLayout = props => {
  return (
    <div className='container mx-auto row'>
      <div className='col-md-8 mx-auto'>{props.children}</div>
    </div>
  );
};

export default RLLayout;
