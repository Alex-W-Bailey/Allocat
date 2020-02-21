const NPLayout = props => {
  return (
    <div className='mx-auto col-md-8'>
      <div className='np-container  mt-5'>{props.children}</div>
    </div>
  );
};

export default NPLayout;
