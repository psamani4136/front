import { Jumbotron } from "reactstrap";
import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import TermCreate from "../../../components/crud/Term";
import Link from "next/link";
const Term = () => {
  return (
    <Layout>
      <Admin>
        <div>
          <header>
            <div>
              <div>
                <Jumbotron>
                <div style={{marginTop: "60px"}}><h3 className="text-center font-weight-bold">Term Dashboard</h3></div>
                <div className="text-center">
                  <p className="lead">
                    This page contains the form to create the Terms for the syllabus.<br />
                    Below you will see all the TERMS created so far.
                  </p>
                  <Link href="/admin">
                    <a className="btn font-weight-bold mr-1 ml-1 mt-3">All Forms</a>
                    </Link>
                </div>
              </Jumbotron>
              </div>
            </div>
          </header>
          <div className="container" style={{marginBottom: "40px"}}>
            <div><TermCreate/></div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Term;
