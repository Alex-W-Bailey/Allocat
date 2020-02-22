import Link from "next/link";

const NPCard = props => {
  return (
    <div className='col-lg-3 mb-2'>
      <div className='card-style card'>
        <div className='card-body d-flex flex-column over'>
          <Link href='/NewProject'>
            <i class="start-icon fas fa-plus-circle mx-auto fa-5x my-auto"></i>
          </Link>
          <h5 className='card-title mx-auto mt-3'>Start New Project</h5>
          <p className='card-text mx-auto text-center'>
            Ready to start your next project?
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
