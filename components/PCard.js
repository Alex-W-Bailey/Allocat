import Link from 'next/link';

const PCard = props => {
    return (
        <div>
            <div className='col-sm-4'>
                <div className='card-body m-2'>
                    <h5 className="card-title">{props.projectName}</h5>
                    <p className="card-text">{props.description}</p>
                    <p className="card-text due-date">Due Date</p>

                    <Link>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PCard;