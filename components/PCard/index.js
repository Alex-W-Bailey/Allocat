import Link from "next/link";

const PCard = props => {
    return (
        <div className="col-lg-4">
            <div className="e-project-card card">
                <div className="card-body">
                    <h5 className="card-title">{props.projectName}</h5>
                    <p className="card-text">{props.description}</p>
                    <button className="btn btn-primary">View Project</button>
                </div>
            </div>
        </div >
    );
};

export default PCard;