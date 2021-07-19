import React from 'react';
import { Link } from 'gatsby';
import { Carousel, Hero, Link as DLLink } from '@aauweb/design-library';

import projectStyles from './project-profile.module.css';
import layoutStyles from '../layout/layout.module.css';
import Section from '../sections/section';
import Container from '../layout/container';

function ProjectProfile(props) {
  const { download, title, student, gallery, videoSpotlight } = props;
  const { school, name } = student;
  const downloadLink = download?.asset?.url;
  const ENTRY_ID = videoSpotlight;

  const carouselData = gallery.map((item) => ({
    id: item._key,
    image: item.asset?.url,
  }));

  return (
    <>
      {school.heroImage && (
        <Hero backgroundImage={school.heroImage.asset.fluid.src} title={`School of ${props.school.title}`} />
      )}

      <Section alignReset noPaddingTop>
        <Container>
          <div className={layoutStyles.breadcrumb}>
            <Link to={'/'}>HOME</Link>
            <span className={layoutStyles.breadcrumbLinkSeperator}>&gt;</span>
            <Link to={`/schools/${school.slug.current}`}>{school.title}</Link>
            <span className={layoutStyles.breadcrumbLinkSeperator}>&gt;</span>
            <div className={layoutStyles.breadcrumbLink}>{name}</div>
          </div>

          <h3 className={projectStyles.projectTitle}>{title}</h3>
          <h2 className={layoutStyles.title}>{name}</h2>

          {downloadLink && (
            <>
              <div className={layoutStyles.columnSection}>
                <DLLink target="_blank" href={downloadLink} variant="cta" label="Download Thesis" onClick={() => {}} />
              </div>
              <div className={projectStyles.divider} />
            </>
          )}

          {videoSpotlight && (
            <iframe
              type="text/javascript"
              src={`https://cdnapisec.kaltura.com/p/${process.env.GATSBY_KALTURA_PARTNER_ID}/sp/${process.env.GATSBY_KALTURA_PARTNER_ID}00/embedIframeJs/uiconf_id/${process.env.GATSBY_KALTURA_UICONF_ID}/partner_id/${process.env.GATSBY_KALTURA_PARTNER_ID}?iframeembed=true&playerId=kaltura_player_1625520477&entry_id=${ENTRY_ID}`}
              style={{ width: 640, height: 360, marginTop: '2em' }}
              allowFullScreen
              webkitallowfullscreen
              mozAllowFullScreen
              frameBorder="0"
              id="kaltura_player_1625520477"
              allow="autoplay *; fullscreen *; encrypted-media *"
            ></iframe>
          )}
          {carouselData && <Carousel data={carouselData} />}
        </Container>
      </Section>
    </>
  );
}

export default ProjectProfile;
