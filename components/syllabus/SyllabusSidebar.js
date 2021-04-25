import { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronCircleRight } from "react-icons/fa";
import { listRelatedSyllabuses } from "../../actions/syllabus";

// const SyllabusSidebar = ({ syllabus }) => {
//   const [related, setRelated] = useState([]);

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

// return <React.Fragment>{showRelatedSyllabuses()}</React.Fragment>;
// };

// export default SyllabusSidebar;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Sidebar = ({syllabus}) => {
  const classes = useStyles();
  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelatedSyllabuses({ syllabus }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, []);

  const showRelatedSyllabuses = () => {
    return related.map((syllabus, i) => {
      return (
        <div key={i}>
          <Link
            href="/syllabus/[slug]"
            as={`/syllabus/${syllabus.subject.slug}`}
          >
            <a>
              <p>
                <FaChevronCircleRight /> {syllabus.subject.name}
              </p>
            </a>
          </Link>
        </div>
      );
    });
  };

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

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}><strong>1. All Strands</strong></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {showAllStrands()}
          </Typography>
        </AccordionDetails>
      </Accordion>
    
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}><strong>2. Related Syllabuses</strong></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {showRelatedSyllabuses()}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Sidebar;
