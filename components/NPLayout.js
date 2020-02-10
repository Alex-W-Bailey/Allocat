// New Project (forms) Layout

const NPLayout = props => {
  return (
    <div className='container mx-auto row'>
      <div className='col-md-10 mx-auto'>{props.children}</div>
    </div>
  );
};

export default NPLayout;
