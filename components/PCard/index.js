import { useRouter } from 'next/router';
import Link from "next/link";

const PCard = props => {
    return (
        <div className="col-lg-4">
            <div className="e-project-card card">
                <div className="card-body">
                    <h5 className="card-title">{props.projectName}</h5>
                    <p className="card-text">{props.description}</p>
                    <Link href="/project/[id]" as={`/project/${props.id}`}>
                        <button className="btn btn-primary">
                            View Project
                        </button> 
                    </Link>   
                </div>
            </div>
        </div >
    );
};

export default PCard;
