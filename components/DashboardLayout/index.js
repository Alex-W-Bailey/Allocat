// This is the layout that will be formatted for the Project Dashboard. Each Project will have its own
const DBLayout = props => {
  return (
    <div className='mx-auto d-flex flex-row container-test'>
      {props.children}
    </div>
  );
};

export default DBLayout;
