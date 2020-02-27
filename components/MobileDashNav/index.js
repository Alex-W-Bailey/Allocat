import "./_style.scss";

const MobileDashNav = props => {
  return (
    <div className='d-flex mobile-dash-nav justify-content-between p-3 pr-5'>
      <div className='text-center'>
        <a
          className='mobile-link pointer p-2'
          onClick={() => props.updateCategory("teams")}
        >
          Teams
        </a>
      </div>
      <div className='text-center'>
        <a
          className='mobile-link pointer p-2'
          onClick={() => props.updateCategory("tasks")}
        >
          Tasks
        </a>
      </div>
      <div className='text-center'>
        <a
          className='mobile-link pointer p-2'
          onClick={() => props.updateCategory("timeline")}
        >
          Timeline
        </a>
      </div>
    </div>
  );
};
export default MobileDashNav;
