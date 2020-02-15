import Link from "next/link";

const PCard = props => {
    return (
        <div className="col-lg-4">
            <div className="eProject-card card" style={{ height: "15rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{props.projectName}</h5>
                    <p className="card-text">{props.description}</p>
                    <button>
                        <Link 
                        href="/project/[id]" 
                        as={`/projects/${props.id}`}>
                            View Project
                        </Link>
                    </button>
                </div>
            </div>
        </div >
    );
};

export default PCard;
