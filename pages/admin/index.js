import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import Link from "next/link";
import { Jumbotron } from "reactstrap";
import { getCategories } from "../../actions/category"
//import Carousal from "../../components/shared/SyllabusCarousal";


const AdminIndex = () => {

  const adminBlock = ({category, }) => {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="col-md-12">
                <ul class="list-group">
                  <li className="list-group-item">
                    <Link href="/admin/crud/category">
                      <a>Create - Remove Category</a>
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link href="/admin/crud/year">
                      <a>Create - Remove Year</a>
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link href="/admin/crud/term">
                      <a>Create - Remove Term</a>
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link href="/admin/crud/substrand-title">
                      <a>Create - Remove a substrand title</a>
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link href="/admin/crud/subject">
                      <a>Create - Remove Subject</a>
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <a href="/admin/crud/introduction">
                      Create an Introduction
                    </a>
                  </li>
                  <li className="list-group-item">
                    <a href="/admin/crud/aim">Create an Aim</a>
                  </li>
                  <li className="list-group-item">
                    <a href="/admin/crud/rationale">Create a Rationale</a>
                  </li>
                  <li className="list-group-item">
                    <a href="/admin/crud/substrand">Create Substrand</a>
                  </li>
                  <li className="list-group-item">
                    <a href="/admin/crud/strand">Create Strand</a>
                  </li>
                  <li className="list-group-item">
                    <a href="/admin/crud/outcome">Create General Outcomes</a>
                  </li>
                  <li className="list-group-item">
                    <a href="/admin/crud/indicator">Create Indicators</a>
                    
                  </li>                  
                  <li className="list-group-item">
                    <a href="/admin/crud/syllabus">Create Syllabus</a>
                  </li>

                  <li className="list-group-item">
                    <Link href="/admin/crud/category-syllabus">
                      <a>Create Category - Syllabus</a>
                    </Link>
                  </li>

                  <li className="list-group-item">
                    <a href="/admin/crud/notes">Manage all notes</a>
                  </li>
                  <li className="list-group-item">
                    <a href="/admin/crud/user">Manage all users</a>
                  </li>
                  <li className="list-group-item">
                    <a href="/user/update">Update Profile</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div>
                This space is meant to be loaded with separate forms when
                invoked!
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Layout>
        <Admin>
          <div>
            <header>
              <div>
                <div>
                  <Jumbotron>
                  <div style={{marginTop: "60px"}}><h3 className="text-center font-weight-bold">Main Admin Dashboard</h3></div>
                  <div className="text-center">
                    <p className="lead">
                      This page contains all the forms to create the content of the syllabus.<br />
                      All construction should follow the order of appearance below.
                    </p>
                    <p className="lead text-center">
                      <Link href="admin/crud/primary">
                        <a className="btn btn-primary mr-4">Manage Primary Syllabus</a>
                      </Link>
                      <Link href="admin/crud/juniorSecondary">
                        <a className="btn btn-primary mr-4">Manage Junior Secondary Syllabus</a>
                      </Link>
                      <Link href="admin/crud/seniorSecondary">
                        <a className="btn btn-primary mr-4">Manage Senior Secondary Syllabus</a>
                      </Link>
                      <Link href="admin/crud/seniorSecondary">
                        <a className="btn btn-primary mr-4">Manage Senior Secondary Book</a>
                      </Link>
                    </p>
                  </div>
                </Jumbotron>
                </div>
              </div>
            </header>
            <div className="container" style={{marginBottom: "40px"}}>
              {/* <div>{adminBlock()}</div> */}
            </div>
          </div>
        </Admin>
      </Layout>
    </React.Fragment>
  );
}

AdminIndex.getInitialProps = ({ query }) => {
  return getCategories(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { category: data.category, syllabuses: data.syllabuses };
    }
  });
};


export default AdminIndex;
