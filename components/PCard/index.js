import { useRouter } from 'next/router';
import Link from "next/link";

const PCard = props => {
    return (
        <div className="col-lg-3 mb-2">
            <div className="card-style card">
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title mx-auto mt-3">{props.projectName}</h5>
                    <p className="card-text ml-2 mt-3">{props.description}</p>
                    <Link href="/project/[id]" as={`/project/${props.id}`}>
                        <button className="mt-auto btn btn-primary">
                            View Project
                        </button>
                    </Link>
                </div>
            </div>
        </div >
    );
};

export default PCard;
