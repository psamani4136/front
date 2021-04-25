import React from "react";
import { Jumbotron, Button } from "reactstrap";
import Layout from "../components/Layout";
import { isAuth } from "../actions/auth";
import Private from "../components/auth/Private";

const Profile = (props) => {
  const name = isAuth() && isAuth().name;
  const email = isAuth() && isAuth().email;
  // const role = isAuth() && isAuth().role;

  return (
    <Layout>
      <Private>
      <Jumbotron>
        <div style={{marginTop: "60px"}}>
         <h3 className="text-center">Welcome, {name} </h3>
        </div>
        
        <p className="lead text-center">
          This page will contain all the information about you. <br />
          This is the information you have supplied to the system when you
          register.
        </p>

        <div className="container">
          <p className="text-center">Your email is: {email}.</p>
          <p className="lead text-center">
            <Button color="primary" className="mr-3">
              Learn More
            </Button>
            <Button color="primary" className="mr-3">
              All your notes
            </Button>
            <Button color="primary" className="mr-3">
              Result history
            </Button>
          </p>
        </div>
      </Jumbotron>
      <div className="container mb-3">
        Information on this component will be supplied later.
      </div>
      </Private>
    </Layout>
  );
};

export default Profile;
