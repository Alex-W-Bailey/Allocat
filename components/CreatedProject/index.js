import Nav from "../Nav/index";
import NPLayout from "../NPLayout/index";
import { useRouter } from "next/router";
import Link from "next/link";

const NPForm = props => {
  return (
    <div>
      <Nav pageTitle={""} />
      <NPLayout>
        <div className='row mt-5'>
          <h1 className='blue-text'>Success!</h1>
          <br />
          <div className='row'>
            <button onClick={() => props.handleRedirectToProjects()}>
              View All Projects
            </button>
            <Link href='/project/[id]' as={`/project/${props.projectId}`}>
              <button>View project</button>
            </Link>
          </div>
        </div>
      </NPLayout>
    </div>
  );
};

export default NPForm;
