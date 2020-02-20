import Link from "next/link";

const NPCard = props => {
  return (
    <div className='col-lg-3'>
      <div className='card-style card'>
        <div className='card-body d-flex flex-column'>
          <h5 className='card-title'>Add New Project</h5>
          <p className='card-text'>
            Ready to start a new project?
          </p>
          <Link href='/NewProject'>
            <button className='mt-auto btn btn-primary'>
              Create New Project
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NPCard;
