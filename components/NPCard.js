import Link from 'next/link';

const NPCard = props => {
    return (
        <div>
            <div className='col-sm-4'>
                <div className='card-body m-2'>
                    <h5 className="card-title">Add New Project</h5>
                    <p className="card-text">Ready to get started on a new project? Add a new project to your projects list.</p>
                    <Link>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NPCard;