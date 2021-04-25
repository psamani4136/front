import React, { useState, useEffect } from "react";
import Link from "next/link";

import { getCategories } from "../../actions/category";

const syllabusHeader = ({syllabus}) => {

    const [allCategories, setAllCategories] = useState([])
    
    const initCategories = () => {
        getCategories().then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            setAllCategories(data)
          }
        })
      }
    
      useEffect(()=> {
        initCategories();
      }, [])

      const showAllCategories = () => {
        return allCategories.map((category, i) => (
          <Link href="/categories/[slug]" as={`/categories/${category.slug}`} key={i}>
            <a className="metabox__category-home-link " style={{letterSpacing: "1px"}}>{category.name}</a>
          </Link>
        ));
        }
      // const loadAllSyllabusButton = () => {
      //   return (
      //       <div className="btn btn-primary font-weight-bold" >
      //         <Link  href={`/syllabus`}>
      //           <a>All Syllabuses</a>
      //         </Link>
      //       </div>
      //   );
      // };

      // const loadAllSyllabusButton = () => {
      //   return (
      //       <div className="font-weight-bold mt-4">
      //         <Link  href={`/syllabus`}>
      //           <a className="btn btn-primary"><strong>All Syllabuses</strong></a>
      //         </Link>
      //       </div>
      //   );
      // };
      
      const loadAllSyllabusButton = () => {
        return (
            <div className="btn btn-outline-primary font-weight-bold mt-2">
              <Link  href={`/syllabus`}>
                <a>Download</a>
              </Link>
            </div>
        );
      };

    return <React.Fragment>
        <div className="page-banner">
          <div className="page-banner__bg-image-substrand">
              <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop" id="herovideo">
                    <source src="../../static/videos/video_3.mp4" type="video/mp4"/>
              </video> 
          </div>  
          <div className="page-banner__content container container--narrow">
              <h1 className="page-banner__title">{syllabus.subject.name} Syllabus</h1>
              <div className="page-banner__intro">
                  <p>This {syllabus.subject.name} Syllabus which was published sometimes ago and is now available in <br />Solomon Islands Schools.
                      {loadAllSyllabusButton()}</p>
                    {/* {loadAllSyllabusButton()} */}
              </div>
          </div> 
            
        </div>
        <div className="container" style={{marginTop:"-20px"}}>
          <div><p className="lead text-center">
            {/* {showAllCategories()} */}
          </p></div>
          {/* <div className="text-center">
            {showAllCategories()}
          </div> */}
        </div>            
    </React.Fragment>;
}

export default syllabusHeader;


