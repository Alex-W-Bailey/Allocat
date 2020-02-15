// This is the layout that will be formatted for the Project Dashboard. Each Project will have its own
const DBLayout = props => {
  return (
    <div className='container mx-auto row'>
      <div className='col-md-12 mx-auto'>{props.children}</div>
    </div>
  );
};

export default DBLayout;
