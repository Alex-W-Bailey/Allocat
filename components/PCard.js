import Link from 'next/link';

const PCard = props => {
    return (
        <div className="col-lg-3">
            <div className="eProject-card">
                <div className="card-body">
                    <h5 className="card-title">{props.projectName}</h5>
                    <p className="card-text">{props.description}</p>
                </div>
            </div>
        </div >
    );
};

export default PCard;