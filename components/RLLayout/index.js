//Formatting/ Layout for Register (R) and Login (L)

const RLLayout = props => {
  return (
    <div className='container mx-auto col-md-8 rl-container'>
      <div className='col-md-10 mx-auto'>{props.children}</div>
    </div>
  );
};

export default RLLayout;
