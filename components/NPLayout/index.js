const NPLayout = props => {
  return (
    <div className='mx-auto col-md-8 col-sm-12'>
      <div className='np-container mt-5'>{props.children}</div>
    </div>
  );
};

export default NPLayout;
