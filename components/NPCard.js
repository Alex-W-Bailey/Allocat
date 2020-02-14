import Link from "next/link";

const NPCard = props => {
  return (
    <div className='col-lg-4'>
      <div className='eProject-card card' style={{ height: "15rem" }}>
        <div className='card-body'>
          <h5 className='card-title'>Add New Project</h5>
          <p className='card-text'>
            Ready to get started on a new project? Add a new project to your
            projects list.
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
