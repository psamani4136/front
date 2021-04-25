// import React, { useState } from "react";
// import {
//   TabContent,
//   TabPane,
//   Nav,
//   NavItem,
//   NavLink,
//   Row,
//   Col,
// } from "reactstrap";
// import classnames from "classnames";
// import renderHTML from "react-render-html";

// const Syllabus = ({ syllabus }) => {
//   const [activeTab, setActiveTab] = useState("1");

//   const toggle = (tab) => {
//     if (activeTab !== tab) setActiveTab(tab);
//   };

  // const showIntroduction = () => {
  //   return syllabus.introduction.map((introduction, i) => {
  //     return (
  //       <div key={i}>
  //         {renderHTML(introduction.body)}
  //       </div>
  //     );
  //   });
  // };

  // const showRationale = () => {
  //   return syllabus.rationale.map((r, i) => {
  //     return (
  //       <div key={i}>
  //         {renderHTML(r.body)}
  //       </div>
  //     );
  //   });
  // };

  // const showAim = () => {
  //   return syllabus.aim.map((a, i) => {
  //     return (
  //       <div key={i}>
  //         {renderHTML(a.body)}
  //       </div>
  //     );
  //   });
  // };



//   return (
//     <div className="mb-5">
//       <Nav tabs>
//         <NavItem>
//           <NavLink
//             className={classnames({ active: activeTab === "1" })}
//             onClick={() => {
//               toggle("1");
//             }}
//           >
//             <div className="font-weight-bold">Introduction</div>
//           </NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink
//             className={classnames({ active: activeTab === "2" })}
//             onClick={() => {
//               toggle("2");
//             }}
//           >
//             <div className="font-weight-bold">Rationale</div>
//           </NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink
//             className={classnames({ active: activeTab === "3" })}
//             onClick={() => {
//               toggle("3");
//             }}
//           >
//             <div className="font-weight-bold">Aim</div>
//           </NavLink>
//         </NavItem>
//         {/* <NavItem>
//           <NavLink
//             className={classnames({ active: activeTab === "4" })}
//             onClick={() => {
//               toggle("4");
//             }}
//           >
//             <div className="font-weight-bold">Program Planner</div>
//           </NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink
//             className={classnames({ active: activeTab === "5" })}
//             onClick={() => {
//               toggle("5");
//             }}
//           >
//             <div className="font-weight-bold">Assessment Planner</div>
//           </NavLink>
//         </NavItem> */}
//       </Nav>
//       <TabContent activeTab={activeTab}>
//         <TabPane tabId="1">
//           <Row>
//             <Col sm="12">
//               <p className="mt-3">
//                 {showIntroduction()}
//                 </p>
//             </Col>
//           </Row>
//         </TabPane>
//         <TabPane tabId="2">
//           <Row>
//             <Col sm="12">
//               <p className="mt-3">
//                 {showRationale()}
//               </p>
//             </Col>
//           </Row>
//         </TabPane>
//         <TabPane tabId="3">
//           <Row>
//             <Col sm="12">
//               <p className="mt-3">
//                 {showAim()}
//               </p>
//             </Col>
//           </Row>
//         </TabPane>
//         {/* <TabPane tabId="4">
//           <Row>
//             <Col sm="12">
//               <p className="mt-3">Contents will be available soon</p>
//             </Col>
//           </Row>
//         </TabPane>
//         <TabPane tabId="5">
//           <Row>
//             <Col sm="12">
//               <p className="mt-3">Contents will be available soon</p>
//             </Col>
//           </Row>
//         </TabPane> */}
//       </TabContent>
//     </div>
//   );
// };

// export default Syllabus;

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import renderHTML from "react-render-html";

function TabPanel(props) {
  const { syllabus, children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SyllabusTabs = ({syllabus}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const showIntroduction = () => {
    return syllabus.introduction.map((introduction, i) => {
      return (
        <div key={i}>
          {renderHTML(introduction.body)}
        </div>
      );
    });
  };

  const showRationale = () => {
    return syllabus.rationale.map((r, i) => {
      return (
        <div key={i}>
          {renderHTML(r.body)}
        </div>
      );
    });
  };

  const showAim = () => {
    return syllabus.aim.map((a, i) => {
      return (
        <div key={i}>
          {renderHTML(a.body)}
        </div>
      );
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Introduction" {...a11yProps(0)} />
          <Tab label="Rationale" {...a11yProps(1)} />
          <Tab label="Aim" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {showIntroduction()}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {showRationale()}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {showAim()}
      </TabPanel>
    </div>
  );
}

export default SyllabusTabs;