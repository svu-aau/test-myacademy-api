import React, { useRef } from 'react';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';

import Globe from '../components/globe';
import Container from '../components/layout/container';
import Section from '../components/sections/section';
import GraphQLErrorList from '../components/graphql-error-list';
import GlobalStudentsGrid from '../components/students/global-students-grid';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';

export const query = graphql`
  query GlobalWorksPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    headerBackgroundImage: file(relativePath: { eq: "Kexuan_Guo_4.jpeg" }) {
      childImageSharp {
        fluid(maxHeight: 815, maxWidth: 1169, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    students: allSanityStudent(filter: { hiddenProfile: { ne: true } }) {
      nodes {
        ...StudentPreview
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  globeContainer: {
    backgroundColor: '#0A1420',
  },
  global: {
    alignItems: 'center',
    display: 'block',
  },
  header: {
    color: 'white',
  },
}));

const GlobalTemplate = (props) => {
  const studentGridRef = useRef();
  const { data, errors } = props;
  const site = (data || {}).site;

  const [countryISO, setCountryISO] = React.useState(null);
  const [updateCount, setUpdateCount] = React.useState(0);

  const classes = useStyles();

  const handleViewButton = (iso) => {
    setCountryISO(iso);
    setUpdateCount(updateCount + 1);

    if (studentGridRef.current) {
      scroll({
        top: studentGridRef.current.offsetTop - 75,
        behavior: 'smooth',
      });
    }
  };

  const studentData =
    data.students &&
    data.students.nodes.reduce((acc, { country }) => {
      if (country) {
        const { title, code } = country;
        const index = acc.findIndex((val) => val.title === title);

        if (index >= 0) {
          acc[index].count += 1;
        } else {
          acc.push({ title, code, count: 1 });
        }
      }
      return acc;
    }, []);

  return (
    <Layout
      siteSubtitle="Global View of Student Portfolios"
      siteTitle="Academy of Art University"
      heroImageCaption="Kexuan Guo / Illustration"
      headerBackgroundImage={data.headerBackgroundImage ? data.headerBackgroundImage : data.backgroundImageFallback}
    >
      <SEO
        title="Global View of Student Portfolios"
        description="Academy of Art University attracts students from around the world. Explore the amazing work of our students by their country of origin. Find fellow artists in your location!"
        keywords={site.keywords}
      />

      {errors && <SEO title="GraphQL Error" path={props.location.pathname} />}

      <Section alignment="center" globe>
        <Container>
          <div className={classes.globeContainer}>
            <div className={classes.global}>
              <div className={classes.header}>
                <h2>Global View of Student Portfolios</h2>
                <p>
                  Academy of Art University welcomes students from all over the world, whether they take onsite classes
                  in San Francisco or anywhere online! In fact, we are a global community, in which our current students
                  and alumni hail from over 115 countries worldwide.
                </p>
                <p>
                  This broad international population demonstrates the diversity of our student body and showcases the
                  prevalence of an art and design education throughout the world. The Academy is immensely proud to
                  showcase not only where our students are originally from, but how their unique backgrounds merged with
                  industry-ready art and design skills are capable of creating such high caliber of portfolio work.
                </p>
                <p>
                  You can click any of the highlighted countries of origin to see the portfolio work of those students.
                  So take a spin on this interactive globe today!
                </p>
              </div>
              <Globe viewPortfolio={handleViewButton} studentData={studentData} />
            </div>
          </div>
        </Container>
      </Section>

      {data.students && (
        <Section color="black">
          <GlobalStudentsGrid
            students={data.students.nodes}
            iso={countryISO}
            ref={studentGridRef}
            updateCountryFilter={countryISO}
            updateCounter={updateCount}
          />
        </Section>
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
    </Layout>
  );
};

export default GlobalTemplate;
