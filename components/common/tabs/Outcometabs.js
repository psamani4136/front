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

const Outcome = ({ props, outcome }) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const showSpecificOutcome = () => {
    return outcome.indicators.map((indicator, i) => {
      return (
        <article key={i}>
          <div className="container">
            <div className="row">
              <div>{renderHTML(indicator.assessment)}</div>
            </div>
          </div>
        </article>
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
            <div className="font-weight-bold">Formative Assessment</div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            <div className="font-weight-bold">Assessment Descriptors</div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "4" })}
            onClick={() => {
              toggle("4");
            }}
          >
            <div className="font-weight-bold">Support Resources</div>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <p className="ml-3 mt-3">
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
              <p className="ml-3 mt-3">{showSpecificOutcome()}</p>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <p className="ml-3 mt-3">Contents will be available soon!</p>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="4">
          <Row>
            <Col sm="12">
              <p className="ml-3 mt-3">Contents will be available soon!</p>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Outcome;
