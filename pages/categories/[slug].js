import React, { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter, withRouter } from "next/router";
import renderHTML from "react-render-html";

import Layout from "../../components/Layout";
import Card from "../../components/common/shared/Card";
import { Jumbotron } from "reactstrap";

import { singleCategory, getCategories, readCategory } from "../../actions/category";
import { isAuth } from "../../actions/auth";
import CategoryCarousal from "../../components/common/carousels/CategoryCarousal";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";    
import categoryHeader from "../../components/categories/category";    

const Category = ({ syllabuses, data }) => {
  // const head = () => (
  //   <Head>
  //     <title>
  //       {category.name} | {APP_NAME}
  //     </title>
  //     <meta
  //       name="description"
  //       content={`${category.name} for ${showLoadedSyllabuses()}`}
  //     />
  //     <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
  //     <meta property="og:title" content={`${category.name} | ${APP_NAME}`} />
  //     <meta
  //       property="og:description"
  //       content={`${category.name} for ${showLoadedSyllabuses()}`}
  //     />
  //     <meta property="og:type" content="website" />
  //     <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
  //     <meta property="og:site_name" content={`${APP_NAME}`} />

  //     <meta
  //       property="og:image"
  //       content={`${DOMAIN}/static/images/emblem_1/png`}
  //     />
  //     <meta
  //       property="og:image:secure_url"
  //       content={`${DOMAIN}/static/images/emblem_1.png`}
  //     />
  //     <meta property="og:image:type" content="image/jpg" />
  //     <meta property="fb:app_id" content={`${FB_APP_ID}`} />
  //   </Head>
  // );

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
    initSyllabuses();
  }, [])

  // const showAllCategories = () => {
  //   return allCategories.map((category, i) => (
  //     <Link href="/categories/[slug]" as={`/categories/${category.slug}`} key={i}>
  //       <a className="metabox__category-home-link "><i className="fa fa-home" aria-hidden="true"></i>{category.name}</a>
  //     </Link>
  //   ));
  //   }

    const showAllCategories = () => {
      return allCategories.map((category, i) => (
        <Link href="/categories/[slug]" as={`/categories/${category.slug}`} key={i}>
          <a className="metabox__category-home-link" style={{letterSpacing: "1px"}}><i className="fa fa-home" aria-hidden="true"></i>{category.name}</a>
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

  const showLoadedSyllabuses = () => {
    return data.map((syllabus, i) => (
      <div key={i}>
        <Card syllabus={syllabus} />
      </div>
    ));
  };

  const loadAllSyllabusButton = () => {
    return (
        <div className="btn btn-outline-primary font-weight-bold mt-2">
          <Link  href={`/syllabus`}>
            <a>All Syllabuses</a>
          </Link>
          {initSyllabuses()}
        </div>
    );
  };

  return (
    <React.Fragment>
      {/* {head()} */}
      <Layout>
        <main>
          <header>
            <div className="page-banner">
            <div className="page-banner__bg-image-substrand">
                 <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop" id="herovideo">
                       <source src="../../static/videos/video_3.mp4" type="video/mp4"/>
                 </video> 
               </div> 
              <div className="page-banner__content container container--narrow">
                  <h1 className="page-banner__title">{category.name}</h1>
                  <div className="page-banner__intro">
                      <p>This is the {category.name} published and is now available in Solomon Islands Schools.<br />
                        This page contains the introductory section of this syllabus document. To reach the detail part you can click on the year level below. {loadAllSyllabusButton()}</p>
                  </div>
              </div> 
              
            </div>
            
            <div className="container" style={{marginTop:"-20px"}}>
              <div className="text-center">
                {showAllCategories()}
              </div>
            </div>
          </header>
          <div className="syllabus-document">{showLoadedSyllabuses()}</div>        
        </main>
      </Layout>
    </React.Fragment>
  );
};

Category.getInitialProps = ({ query }) => {
  return singleCategory(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {data};
    }
  });
};

export default withRouter(Category);
