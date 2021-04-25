import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import renderHTML from "react-render-html";
import Link from "next/link";
import { FaChevronCircleRight } from "react-icons/fa";

import { listRelatedSyllabuses } from "../../actions/syllabus";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
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
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce({syllabus}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const [related, setRelated] = useState([]);

  // const loadRelated = () => {
  //   listRelatedSyllabuses({ syllabus }).then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       setRelated(data);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   loadRelated();
  // }, []);

  // const showRelatedSyllabuses = () => {
  //   return related.map((syllabus, i) => {
  //     return (
  //       <div key={i}>
  //         <Link
  //           href="/syllabus/[slug]"
  //           as={`/syllabus/${syllabus.subject.slug}`}
  //         >
  //           <a>
  //             <p>
  //               <FaChevronCircleRight /> {syllabus.subject.name}
  //             </p>
  //           </a>
  //         </Link>
  //       </div>
  //     );
  //   });
  // };

  const showAllStrands = () => {
    return syllabus.strands.map((strand, i) => {
      return (
        <div key={i} className="col-md-12">
          <Link href="/strand/[slug]" as={`/strand/${strand.slug}`}>
            <a>
              <p><FaChevronCircleRight /> {strand.title}</p>
            </a>
          </Link>
        </div>
      );
    });
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
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Section 1: Introduction" icon={<PhoneIcon />} {...a11yProps(0)} />
          <Tab label="Section 2: Rationale" icon={<FavoriteIcon />} {...a11yProps(1)} />
          <Tab label="Section 3: Aim" icon={<PersonPinIcon />} {...a11yProps(2)} />
         
          <Tab label="Section 4: Program Planner" icon={<ShoppingBasket />} {...a11yProps(3)} />
          <Tab label="Section 5: Assessment Planner" icon={<ThumbDown />} {...a11yProps(4)} />
         
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <strong><h4 className="mt-2 mb-3">Introduction</h4></strong>
        {showIntroduction()}
      </TabPanel>
      <TabPanel value={value} index={1}>
      <strong><h4 className="mt-2 mb-3">Rationale</h4></strong>
        {showRationale()}
      </TabPanel>
      <TabPanel value={value} index={2}>
      <strong><h4 className="mt-2 mb-3">Aim</h4></strong>
        {showAim()}
      </TabPanel>
      
      <TabPanel value={value} index={3}>
        CONTENTS FOR THIS TAB WILL BE HERE SOON!
      </TabPanel>
      <TabPanel value={value} index={4}>
      CONTENTS FOR THIS TAB WILL BE HERE SOON!
      </TabPanel>
      
    </div>
  );
}


// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//     display: 'flex',
//     height: 300,
//   },
//   tabs: {
//     borderRight: `1px solid ${theme.palette.divider}`,
//   },
// }));

// export default function VerticalTabs({syllabus}) {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//     const [related, setRelated] = useState([]);

//   const loadRelated = () => {
//     listRelatedSyllabuses({ syllabus }).then((data) => {
//       if (data.error) {
//         console.log(data.error);
//       } else {
//         setRelated(data);
//       }
//     });
//   };

//   useEffect(() => {
//     loadRelated();
//   }, []);

//   const showRelatedSyllabuses = () => {
//     return related.map((syllabus, i) => {
//       return (
//         <div key={i}>
//           <Link
//             href="/syllabus/[slug]"
//             as={`/syllabus/${syllabus.subject.slug}`}
//           >
//             <a>
//               <p>
//                 <FaChevronCircleRight /> {syllabus.subject.name}
//               </p>
//             </a>
//           </Link>
//         </div>
//       );
//     });
//   };

//   const showAllStrands = () => {
//     return syllabus.strands.map((strand, i) => {
//       return (
//         <div key={i} className="col-md-12">
//           <Link href="/strand/[slug]" as={`/strand/${strand.slug}`}>
//             <a>
//               <p><FaChevronCircleRight /> {strand.title}</p>
//             </a>
//           </Link>
//         </div>
//       );
//     });
//   };

//   const showIntroduction = () => {
//     return syllabus.introduction.map((introduction, i) => {
//       return (
//         <div key={i}>
//           {renderHTML(introduction.body)}
//         </div>
//       );
//     });
//   };

//   const showRationale = () => {
//     return syllabus.rationale.map((r, i) => {
//       return (
//         <div key={i}>
//           {renderHTML(r.body)}
//         </div>
//       );
//     });
//   };

//   const showAim = () => {
//     return syllabus.aim.map((a, i) => {
//       return (
//         <div key={i}>
//           {renderHTML(a.body)}
//         </div>
//       );
//     });
//   };

//   return (
//     <div className={classes.root}>
//         <div style={{textAlign:"center"}}>Content</div>
//       <Tabs
//         orientation="vertical"
//         variant="scrollable"
//         value={value}
//         onChange={handleChange}
//         aria-label="Vertical tabs example"
//         className={classes.tabs}
//       >
         
//         <Tab label="Section 1: Introduction" {...a11yProps(0)} />
//         <Tab label="Section 2: Rationale" {...a11yProps(1)} />
//         <Tab label="Section 3: Aim" {...a11yProps(2)} />
//         <Tab label="Section 4: Strands" {...a11yProps(3)} />
//         <Tab label="Section 5: Program Planner" {...a11yProps(4)} />
//         <Tab label="Section 6: Assessment Planner" {...a11yProps(5)} />
//         <Tab label="Section 7: Contribution to KLO" {...a11yProps(6)} />
//       </Tabs>
      
//       <TabPanel value={value} index={0}>
//       {showIntroduction()}
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         {showRationale()}
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         {showAim()}
//       </TabPanel>
//       <TabPanel value={value} index={3}>
//         Item Four
//       </TabPanel>
//       <TabPanel value={value} index={4}>
//         Item Five
//       </TabPanel>
//       <TabPanel value={value} index={5}>
//         Item Six
//       </TabPanel>
//       <TabPanel value={value} index={6}>
//         Item Seven
//       </TabPanel>
//     </div>
//   );
// }