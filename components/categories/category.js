import React, { useState, useEffect } from "react";
import Link from "next/link";

import { singleCategory, getCategories, readCategory } from "../../actions/category";

const categoryHeader = () => {

    // const [allCategories, setAllCategories] = useState([])
    
    // const initCategories = () => {
    //     getCategories().then((data) => {
    //       if (data.error) {
    //         console.log(data.error);
    //       } else {
    //         setAllCategories(data)
    //       }
    //     })
    //   }
    
    //   useEffect(()=> {
    //     initCategories();
    //   }, [])

    //   const showAllCategories = () => {
    //     return allCategories.map((category, i) => (
    //       <Link href="/categories/[slug]" as={`/categories/${category.slug}`} key={i}>
    //         <a className="metabox__category-home-link "><i className="fa fa-home" aria-hidden="true"></i>{category.name}</a>
    //       </Link>
    //     ));
    //     }
    //   const loadAllSyllabusButton = () => {
    //     return (
    //         <div className="btn btn-outline-primary font-weight-bold" >
    //           <Link  href={`/syllabus`}>
    //             <a>All Syllabuses</a>
    //           </Link>
    //         </div>
    //     );
    //   };

    const [allCategories, setAllCategories] = useState([])
  const [category, setCategory] = useState([])
  // const [allSyllabuses, setAllSyllabuses] = useState([])
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
    //initSyllabuses();
  }, [])

  const showAllCategories = () => {
    return allCategories.map((category, i) => (
      <Link href="/categories/[slug]" as={`/categories/${category.slug}`} key={i}>
        <a className="btn font-weight-bold mr-1 ml-1 mt-3">{category.name}</a>
      </Link>
    ));
  }

  //Parsing router param as query string
  const router = useRouter()
  const { slug } = router.query

  const initSyllabuses = () => {
      readCategory(slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategory(data)
        }
      })
  }

  // const showLoadedSyllabuses = () => {
  //   return data.map((syllabus, i) => (
  //     <div key={i} style={{display: 'flex'}}>
  //       <Card syllabus={syllabus} />
  //     </div>
  //   ));
  // };
      
    return <React.Fragment>
        <div className="page-banner">
            <div className="page-banner__bg-image"></div>
            <div className="page-banner__content container container--narrow">
                <h1 className="page-banner__title"></h1>
                <div className="page-banner__intro">
                    <p>This is the $$$$$$ published and is now available in Solomon Islands Schools.<br />
                      This page contains the introductory section of this syllabus document. To reach the detail part you can click on the year level below. </p>
                </div>
            </div> 
            
        </div>
        
        <div className="container" style={{marginTop:"-20px"}}>
          <div>
            <p className="lead text-center">
            {/* {showAllCategories()} */}
            </p>
          </div>
        </div>
            
    </React.Fragment>;
}

export default categoryHeader;


