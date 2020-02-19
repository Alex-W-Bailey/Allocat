const NPLayout = props => {
  return (
    <div className='container mx-auto col-md-8'>
      <div className='np-container col-md-10 mx-auto'>{props.children}</div>
    </div>
  );
};

export default NPLayout;
