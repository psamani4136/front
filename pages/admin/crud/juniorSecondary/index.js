import Layout from "../../../../components/Layout";
import Admin from "../../../../components/auth/Admin";
import Link from "next/link";
import { Jumbotron } from "reactstrap";



const AdminIndex = () => {

  return (
    <React.Fragment>
      <Layout>
        <Admin>
          <div>
            <header>
              <div>
                <div>
                  <Jumbotron>
                      
                  <div style={{marginTop: "60px"}}><h3 className="text-center font-weight-bold">Admin Junior Secondary Dashboard</h3></div>
                  <div className="text-center">
                    <p className="lead">
                      This page contains all the forms to create the content of the junior secondary.<br />
                      All construction should follow the order of appearance below.
                    </p>
                    <p className="lead text-center">
                      <Link href="primary">
                        <a className="btn btn-primary mr-4">Manage Primary Syllabus</a>
                      </Link>
                      <Link href="juniorSecondary">
                        <a className="btn btn-primary mr-4">Manage Junior Secondary Syllabus</a>
                      </Link>
                      <Link href="seniorSecondary">
                        <a className="btn btn-primary mr-4">Manage Senior Secondary Syllabus</a>
                      </Link>
                      <Link href="seniorSecondary">
                        <a className="btn btn-primary mr-4">Manage Senior Secondary Book</a>
                      </Link>
                    </p>
                  </div>
                </Jumbotron>
                </div>
              </div>
            </header>
            <div className="container" style={{marginBottom: "40px"}}>
             
            </div>
          </div>
        </Admin>
      </Layout>
    </React.Fragment>
  );
}

export default AdminIndex;
