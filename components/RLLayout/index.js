//Formatting/ Layout for Register (R) and Login (L)

const RLLayout = props => {
  return (
    <div className='col-md-7 col-sm-12 mx-auto'>
      <div className='rl-container mx-auto'>{props.children}</div>
    </div>
  );
};

export default RLLayout;
