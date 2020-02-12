import Link from "next/link";

const PCard = props => {
  return (
    <div>
      <div className='col-sm-4'>
        <div className='card-body m-2'>
          <h5 className='card-title'>{props.projectName}</h5>
          <p className='card-text'>{props.description}</p>
          <p className='card-text due-date'>{props.dueDate}</p>

          <Link>
            <a href='#' className='btn btn-primary'>
              Go to {props.projectName} Dashboard
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PCard;
