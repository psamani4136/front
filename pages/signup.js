import Layout from "../components/Layout";
import SignUpComponent from "../components/auth/SignupComponent";
const Signup = () => {
  return (
    <React.Fragment>
      <Layout>
        <div className="modal-wrapper">
          <div className="modal-header">
            <p className="font-weight-bold" style={{ color: "#fff" }}>
              REGISTER
            </p>
            <span className="modal-close-btn"></span>
          </div>
          <div className="modal-content">
            <div className="modal-body">
              <h4>*All fields are required</h4>
              <p>
                <SignUpComponent />
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
  // source: Build Modal Component With React
};
export default Signup;
