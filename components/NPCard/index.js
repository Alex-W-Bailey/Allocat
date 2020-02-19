import Link from "next/link";

const NPCard = props => {
  return (
    <div className='col-lg-3'>
      <div className='card-style card'>
        <div className='card-body'>
          <h5 className='card-title'>Add New Project</h5>
          <p className='card-text'>
            Ready to start a new project?
          </p>
          <Link>
            <a href='/NewProject' className='btn btn-primary'>
              Create New Project
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NPCard;
