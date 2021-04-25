import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import renderHTML from "react-render-html";

const Syllabus = ({ props, substrand }) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const showAllAssessment = () => {
    return substrand.outcomes.map((o, i) => {
      return (
        <div key={i} className="container">
          <div className="row">{renderHTML(o.assessment)}</div>
        </div>
      );
    });
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            <div className="font-weight-bold">Instruction</div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            <div className="font-weight-bold">Summative Assessment</div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            <div className="font-weight-bold">Assessment Guide</div>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <p className="mt-3">
                In the next tab, you will see a set of questions. The questions
                were developed against the learning outcomes. As a reference,
                the number infront is the learning outcome. You can adapt any of
                the questions provided here for your end of substrand test.
              </p>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <p className="mt-3">{showAllAssessment()}</p>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <p className="mt-3">Contents will be available soon!</p>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Syllabus;
