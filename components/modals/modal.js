import React, { useState } from "react";
import { APP_NAME } from "../../config";

// reactstrap components
import { Button, NavLink, Modal, ModalBody, ModalFooter } from "reactstrap";
import { FaPhoneVolume, FaRegEnvelope, FaUmbrella } from "react-icons/fa";

const myModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <NavLink
        className="font-weight-bold"
        onClick={() => setModalOpen(!modalOpen)}
        style={{ cursor: "pointer" }}
      >
        &copy; {APP_NAME}
      </NavLink>

      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header text-center">
          <h8 className=" modal-title font-weight-bold" id="exampleModalLabel">
            &copy; mehrd <br />
          </h8>
        </div>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div
                className="ml-5"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "50%",
                }}
              >
                <img
                  src="../../static/images/emblem_1.png"
                  alt="Logo"
                  style={{
                    height: "10rem",
                    width: "20rem",
                    marginLeft: "5rem",
                  }}
                />
              </div>
            </div>

            <div className="text-center">
              <strong>Solomon Islands Government</strong>
              <hr />
            </div>
            <div className="text-center mb-3">
              <FaUmbrella />
              <br />
              <strong>
                Ministry of Education and Human <br />
                Resource Development
              </strong>
              <br />
              P.O.Box G28, Honiara, Solomon Islands
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <strong>
                  <FaRegEnvelope />
                  <br />
                  eMail
                </strong>{" "}
                <br />
                LWate@mehrd.gov.sb
              </div>
              <hr />
              <div className="col-md-6 text-center">
                <strong>
                  <FaPhoneVolume />
                  <br />
                  Phone
                  <br />
                </strong>
                (677) 28803, 28804
              </div>
            </div>
          </div>
          <div></div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default myModal;
