import Nav from "../Nav/index";
import NPLayout from "../NPLayout/index";
import { useRouter } from "next/router";
import Link from "next/link";

const NPForm = props => {
  return (
    <div>
      <NPLayout>
        <div className='row m-5 justify-center'>
          <h1 className='blue-text'>Success!</h1>
          <br />
        </div>
        <div className='row justify-center'>
          <button onClick={() => props.handleRedirectToProjects()}>
            View All Projects
          </button>
          <Link href='/project/[id]' as={`/project/${props.projectId}`}>
            <button>View project</button>
          </Link>
        </div>
      </NPLayout>
    </div>
  );
};

export default NPForm;
