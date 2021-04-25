import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Jumbotron, Button } from "reactstrap";
import renderHTML from "react-render-html";
import { withRouter } from "next/router";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";

import Layout from "../../components/Layout";

import Private from "../../components/auth/Private";

import MainSyllabusCarousel from "../../components/common/carousels/MainSyllabusCarousal";
import Card from "../../components/common/shared/Card";
import { getSyllabusesWithCategory } from "../../actions/syllabus";
import { singleCategory } from "../../actions/category";
import { isAuth } from "../../actions/auth";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";


const Syllabus = ({
  syllabuses,
  categories,
  totalSyllabuses,
  syllabusesLimit,
  syllabusSkip,
  router,
}) => {
  const head = () => (
    <Head>
      <title>SI syllabuses | {APP_NAME}</title>
      <meta
        name="description"
        content="All syllabuses for use across the Solomon Islands schools"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta property="og:title" content={`SI Elearning | ${APP_NAME}`} />
      <meta
        property="og:description"
        content="Elearning development for all schools"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/emblem_1/png`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/emblem_1.png`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const [limit, setLimit] = useState(syllabusesLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalSyllabuses);
  const [loadedSyllabuses, setLoadedSyllabuses] = useState([]);
  const [myCategory, setMyCategory] = useState([]);
  const loadMore = () => {
    let toSkip = skip + limit;
    getSyllabusesWithCategory(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedSyllabuses([...loadedSyllabuses, ...data.syllabuses]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button
          onClick={loadMore}
          className="btn btn-outline-primary font-weight-bold mr-1 ml-1 mb-5"
        >
          Load more
        </button>
      )
    );
  };
 
  useEffect(()=> {
    singleCategoryWithSyllabuses()
  }, [])

  const singleCategoryWithSyllabuses = (slug) => {
    //console.log(slug)
    singleCategory(slug).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMyCategory(data)
      }
    })
  }

  const showAllCategories = () => {
    return categories.map((category, i) => (
      <Link href="/categories/[slug]" as={`/categories/${category.slug}`} key={i}>
        <a className="metabox__category-home-link"><i className="fa fa-home" aria-hidden="true"></i>{category.name}</a>
      </Link>
    ));
    }

  const showAllSyllabuses = () => {
    return syllabuses.map((syllabus, i) => {
      return (
        <div key={i}>
          <Card syllabus={syllabus} />
        </div>
      );
    });
  };

  const showLoadedSyllabuses = () => {
    return loadedSyllabuses.map((syllabus, i) => (
      <div key={i}>
        <Card syllabus={syllabus} />
      </div>
    ));
  };

  const mySyllabuses = () => {
    return myCategory.syllabuses.map((s, i) => {
      return (
        <div key={i} className="mb-1">
          <Link href="/syllabus/[slug]" as={`/syllabus/${s.slug}`}>
            <a>
              <FaChevronCircleRight /> <strong>{s.subject.name}</strong>
            </a>
          </Link>
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <section className="head-section">
          <div className="page-banner">
            <div className="page-banner__bg-image-substrand">
              <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop" id="herovideo">
                    <source src="../../static/videos/video_3.mp4" type="video/mp4"/>
              </video> 
            </div>    
            <div className="page-banner__content container container--narrow">
              <h1 className="page-banner__title">All Syllabuses</h1>
              <div className="page-banner__intro">
                  <p> This page contains all the syllabuses published and is now available in <br />Solomon Islands Schools.
            You can click MORE button below to expand <br />your search on the current page. 
            However, you can click the orange button <br />below to browse a syllabus document under specific category.</p>
              </div>
            </div> 
          
          </div>
          
          <div className="container" style={{marginTop:"-20px"}}>
            <div className="text-center">
              {showAllCategories()}
            </div>
          </div>
        </section>

        <section className="syllabus-document">
          {showAllSyllabuses()}
        </section>
        <div className="text-center">{loadMoreButton()}</div>
      </Layout>
    </React.Fragment>
  );
};

Syllabus.getInitialProps = () => {
  let skip = 0;
  let limit = 4;

  return getSyllabusesWithCategory(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        syllabuses: data.syllabuses,
        categories: data.categories,
        totalSyllabuses: data.size,
        syllabusesLimit: limit,
        syllabusSkip: skip,
      };
    }
  });
};

export default withRouter(Syllabus);
