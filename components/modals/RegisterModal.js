import React, { useState } from "react";
import Register from "../../components/auth/SignupComponent";
// import { APP_NAME } from "../../config";

// reactstrap components
import { Button, NavLink, Modal, ModalBody, ModalFooter } from "reactstrap";

const myRegisterModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <NavLink
        className="font-weight-bold"
        onClick={() => setModalOpen(!modalOpen)}
        style={{ cursor: "pointer", marginTop: "0px" }}
      >
        <div className="btn btn-primary">REGISTER</div>
      </NavLink>

      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header text-center">
          <h8 className=" modal-title font-weight-bold" id="exampleModalLabel">
            &copy; REGISTER <br />
          </h8>
        </div>
        <ModalBody>
          <div className="container">
            <div className="text-center" style={{ marginBottom: "2rem" }}>
              <p style={{ backgroundColor: "none" }}>
                <img
                  src="../../static/images/emblem_1.png"
                  alt="Logo"
                  style={{
                    height: "5rem",
                    width: "10rem",
                    marginLeft: "5rem",
                  }}
                />
                <br />
                Ministry of Education and Human <br />
                Resource Development
              </p>
            </div>
            <div className="text-center mb-3">
              <Register />
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default myRegisterModal;
