//Formatting/ Layout for Register (R) and Login (L)

const RLLayout = props => {
  return (
    <div className='container mx-auto row'>
      <div className='col-md-8 mx-auto'>{props.children}</div>
    </div>
  );
};

export default RLLayout;
