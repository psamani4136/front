import React, { useState } from "react";
import Link from "next/link";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import { FaChevronCircleRight } from "react-icons/fa";
import classnames from "classnames";
import renderHTML from "react-render-html";

const Strand = ({ props, strand }) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  // const showAllSubstrands = () => {
  //   return strand.substrands.map((substrand, i) => {
  //     return (
  //       <div className="mb-2" key={i}>
  //         <Link href="/substrand/[slug]" as={`/substrand/${substrand.slug}`}>
  //           <a>
  //             <FaChevronCircleRight /> {"   "}
  //             <strong>{substrand.title}</strong>
  //           </a>
  //         </Link>
  //       </div>
  //     );
  //   });
  // };

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
            <div className="font-weight-bold">
              All substrands of this strand
            </div>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <p className="mt-3">
                The next tab contain all the substrands from years 1 to 6 for
                this strand. Once it is clicked, it will show all details of
                that substrand. Click your choice.
              </p>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <p className="mt-3">
                {/* {showAllSubstrands()} */}
                Content for this tab will be available soon!
              </p>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Strand;
