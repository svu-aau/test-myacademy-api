import React from 'react';
import { graphql } from 'gatsby';

import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';
import ContentSections from '../components/pagebuilder/content-sections';

import schoolsCollageImage from '../images/1533337146257.png';
import calloutImage from '../images/1612301666501.png';

import styles from './homepage.module.css';

export const query = graphql`
  query HomePageQuery {
    gatsby: site {
      config: siteMetadata {
        siteUrl
        title
        description
        userTwitter
      }
    }
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    page: sanityPage(slug: { current: { eq: "home" } }) {
      content: contentArray {
        ...PageContent
      }
      title
      seoImage {
        asset {
          _id
          url
          img: fixed(width: 1024) {
            width
            height
            src
          }
        }
      }
      seoKeywords
      seo {
        focus_keyword
        meta_description
        seo_title
      }
    }
  }
`;

const IndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const {
    gatsby: { config },
    site,
    page,
  } = data;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const renderPage = () => {
    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <h2>Midpoint Review Sign-up</h2>
          <p>
            <span>
              All students eligible for Midpoint Review need to sign-up during period below.
              <br />
              <br />
              <strong>Spring 2021 Sign-up Period</strong>: Monday, February 15, 2021 at 8:00 AM (Pacific Time) through
              Sunday, February 28, 2021 at 11:59 PM (Pacific Time)
              <br />
              <ul>
                <li>
                  <strong>
                    <a href="http://gradstudents.academyart.edu/midpoint_review.html">Midpoint Review Sign-up Form</a>
                  </strong>
                </li>
                <li>
                  Click on your <a href="http://gradshowcase.academyart.edu/schools.html">School's page</a> for
                  review-specific guidelines
                </li>
              </ul>
              Midpoint Review Presentations take place <strong>March 22, 2021 - May 21, 2021</strong>
              <br />
              <br />
              *Some departments hold reviews outside these dates. If you have any questions contact the Review
              Coordinator <a href="mailto:reviews@academyart.edu">reviews@academyart.edu</a>
              <br />
              <br />
              *Reviews will not be scheduled during Commencement
            </span>
          </p>
          <div className={styles.callout}>
            <img className={styles.calloutImage} src={calloutImage} alt="Random Image" />
            <div className={styles.calloutRight}>
              <h2>Student Online Review Checklist</h2>
              <ol>
                <li>Complete sign-up form above (check eligibility with your Graduate Advisor)</li>
                <li>
                  You will receive an email a few weeks after the sign-up closes from the Review Coordinator or
                  Department with your scheduled review day/time. Prepare for your review in advance by going to your
                  School's page then select your Department - find your scheduled review in your student portal
                </li>
                <li>
                  Online reviews are conducted in Zoom, please read the Online Review Information & Technical
                  Requirements
                </li>
                <li>Additional important and helpful resources click here</li>
                <li>
                  Thoroughly read your Department guidelines in its entirety to ensure you meet all requirements
                  (helpful timeline and checklist provided) - example thesis projects can be found here
                </li>
              </ol>
            </div>
          </div>
          <a href="http://gradshowcase.academyart.edu/schools.html">
            <img alt="Image" className={styles.schoolsCollageImage} src={schoolsCollageImage} />
          </a>
        </div>
        <div className={styles.right}>
          <div>
            <h2>Final Review Sign-up</h2>
            <p>
              All students eligible for Final Review sign-up during period below:
              <br />
              <strong>Spring 2021 Final Review Sign-up Period</strong>: Monday, February 15, 2021 at 8:00 AM (Pacific
              Time) through Sunday, February 28, 2021 at 11:59 PM (Pacific Time).
              <br />
              <ul>
                <li>
                  <a href="http://gradstudents.academyart.edu/final_review.html">Final Review Sign-up Form</a>
                </li>
                <li>
                  Click on your <a href="http://gradshowcase.academyart.edu/schools.html">School's page</a> for
                  review-specific guidelines
                </li>
              </ul>
              <br />
              Presentations take place <bold>March 22, 2021 - May 21, 2021</bold>
              <br />
              ***Students in their final semester of classes are required to participate in Final Review and must
              sign-up using the sign-up form to make scheduling requests. Students who have completed classes and need
              to re-present Final Review must sign-up to be scheduled for Final Review. If you are unsure if you are
              eligible to sign-up this semester, please check with your Graduate Advisor.
              <br />
              <ul>
                <li>
                  <strong>Departments that require MA students to present should sign-up here:</strong> MA-COM, MA-FSH
                  Journalism, and MA-PH students.
                </li>
              </ul>
              MA-ADV, MA-ARE, MA-ARH, and MA-IDS students are scheduled by department - for questions, contact your
              department directly.
              <strong>
                All other MA students will be contacted by the Review Coordinator with information about the MA Final
                Portfolio Review submission and should not sign-up.{' '}
              </strong>
            </p>
          </div>
          <div>
            <h2>Contact Information</h2>
            <p>
              <ul>
                <li>
                  Review Coordinator: <a href="mailto:reviews@academyart.edu">reviews@academyart.edu</a>
                </li>
                <li>
                  Zoom Support: <a href="mailto:onlinegradstudies@academyart.edu">onlinegradstudies@academyart.edu</a>
                </li>
                <li>
                  Graduate School: <a href="mailto:graduateschool@academyart.edu">graduateschool@academyart.edu</a>
                </li>
              </ul>
              415-274-8617 or 1-800-ARTS X8617
              <br />
              Office Hours: Monday through Friday, 9AM - 6PM (Pacific Time)
            </p>
          </div>
          <div>
            <h2>Important and Helpful Resources</h2>
            <p>
              <ul>
                <li>
                  <a href="http://gradshowcase.academyart.edu/content/dam/Grad%20Showcase/home_page/pdf/Uploading_Review_Content_2021.pdf">
                    How to Access Portal & Upload Review Materials
                  </a>
                </li>
                <li>
                  <a href="http://gradshowcase.academyart.edu/content/dam/Grad%20Showcase/home_page/pdf/Accessing_Review_Results_2021.pdf">
                    How to Access your Review Results
                  </a>
                </li>
              </ul>
              <a href="http://gradshowcase.academyart.edu/resources.html">Quick Link</a> to additional resources and
              answers to common questions to help you prepare for your Midpoint and Final Review.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout
      headerBackgroundImage={data.headerBackgroundImage ? data.headerBackgroundImage : data.backgroundImageFallback}
    >
      <SEO
        title={site.title || config.title}
        description={page.seo.meta_description}
        keywords={page.seoKeywords || site.keywords}
        seoImage={page.seoImage?.asset?.img?.src}
        path={props.location.pathname}
      />
      {renderPage()}
      {/*page && <ContentSections content={page.content} />*/}
    </Layout>
  );
};

export default IndexPage;
