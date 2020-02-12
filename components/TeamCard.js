import Link from 'next/link';

const TeamCard = props => {
    return (
        <div>
            <div className="col-sm-3">
                <div className="card mt-5">
                    <div className="card-body m-2">
                        <h5 className="card-title">{props.teamName}</h5>
                        <p>{props.progress}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamCard; 