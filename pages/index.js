import React, { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import Typed from "react-typed";    

import { withRouter } from "next/router";

import Layout from "../components/Layout";
import { signout, isAuth } from "../actions/auth";
import { getSyllabusesWithCategory } from "../actions/syllabus";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../config";

const ROLES = ["Ministry of Education and Human Resource Development"];

const Index = ({ categories, router }) => {
  const head = () => (
    <Head>
      <title>SI eLearning | {APP_NAME}</title>
      <meta
        name="description"
        content="Solomon Islands elearning flatform for use in schools across the Solomon Islands"
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
  const showAllCategories = () => {
    return categories.map((c, i) => (
      <React.Fragment key={i}>
        <Link href="categories/[slug]" as={`/categories/${c.slug}`} key={i}>
          <a className="btn btn-ghost">{c.name}</a>
        </Link>
      </React.Fragment>
    ));
  };

  // const loadAllSyllabusButton = () => {
  //   return (
  //       <div className="btn btn-outline-primary font-weight-bold mt-2">
  //         <Link  href={`/syllabus`}>
  //           <a>All Syllabuses</a>
  //         </Link>
  //       </div>
  //   );
  // };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <section className="landing">
          <div className="dark-overlay">
            <div className="landing-inner">
              <img
                src="../static/images/emblem_01.png"
                alt="Logo"
                style={{
                  height: "10rem",
                  width: "20rem",
                  // display: "block",
                  marginLeft: "46%",
                  marginRight: "auto",
                  // position: "50%",
                  // marginTop: "3%",
                }}
              />
              <div className="mb-5">
                <div className="government">
                  <strong>Solomon Islands Government</strong>
                </div>
              </div>
              {/* <div className="left-border pl-2 mb-3">
                <Typed
                  loop
                  strings={ROLES}
                  typeSpeed={70}
                  backSpeed={70}
                  backDelay={1000}
                  loopCount={0}
                  showCursor
                  className="self-typed"
                  cursorChar="|"
                ></Typed>
              </div> */}
              <p className="lead">
                Ministry of Education and Human Resource Development elearning
                portal for schools in the Solomon Islands. It begins with the
                displaying of all the syllabuses for Primary, Junior Secondary,
                Senior Secondary and the TVET training centers. All links to
                your syllabus starts with the buttons below. There, you will have
                access to download the pdf files of the syllabus.
              </p>
              <p className="lead">
                However, if you want to browse through your chosen document on
                the fly, then please click appropriate button item on
                the next page.
              </p>
              <div className="buttons">{showAllCategories()}</div>
              {/* <div className="mt-3"><p className="text-center">{loadAllSyllabusButton()}</p></div> */}
            </div>
          </div>
        </section>
        </Layout>
    </React.Fragment>
  );
};

Index.getInitialProps = () => {
  return getSyllabusesWithCategory().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        categories: data.categories,
      };
    }
  });
};

export default withRouter(Index);





