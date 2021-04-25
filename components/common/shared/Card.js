import React from "react";
// import {
//   Card,
//   CardBody,
//   Button,
//   CardTitle,
//   CardText,
//   CardImg,
// } from "reactstrap";
import Link from "next/link";
import { FaChevronCircleRight } from "react-icons/fa";
import renderHTML from "react-render-html";
// import { isAuth } from "../../../actions/auth";

// const syllabusCard = ({ props, syllabus }) => {
//   return (
//     <React.Fragment>
      
//       <div className="container">
//           <div className="col-md-6 mb-3" >
//             <div className="card h-40">
//               <img className="card-img-top" src="http://placehold.it/700x400" alt="" />
//               <div className="card-body">
//                 <h5 className="text-center font-weight-bold mb-3">{syllabus.subject.name}</h5>
//                 <div className="text-center mb-3">
//                   <Link href={`/syllabus/${syllabus.slug}`}>
//                     <a className="font-weight-bold">
//                       <FaChevronCircleRight /> {"   "}
//                       View Syllabus Content
//                     </a>
//                   </Link>
//                 </div>               
//                 <p className="card-text">{renderHTML(syllabus.excerpt)}</p>
//               </div>
//               <div className="text-center mb-3">
//                 <span className="btn btn-outline-primary">Download</span>
//               </div>
//             </div>
//           </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default syllabusCard;

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    marginLeft: '10%',
    marginBottom: 60
  },
});

const syllabusCard = ({syllabus}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="20"
          image="/static/images/ocean.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {syllabus.subject.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {renderHTML(syllabus.excerpt)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Link href={`/syllabus/${syllabus.slug}`}>
            <a className="font-weight-bold">
              <FaChevronCircleRight /> {"   "}
              View Syllabus Content
            </a>
          </Link>
        </Button>
        <Button size="small" color="primary">
          Download
        </Button>
      </CardActions>
    </Card>
  );
}

export default syllabusCard;
