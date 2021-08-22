import React from 'react';
import { Link } from 'gatsby';
import { Carousel, Hero, Link as DLLink } from '@aauweb/design-library';

import { projectTitle, divider } from './project-profile.module.css';
import { breadcrumbLinkSeperator, breadcrumb, columnSection } from '../layout/layout.module.css';
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
      {school.heroImage && <Hero backgroundImage={school.heroImage.asset.url} title={`School of ${school.title}`} />}

      <Section alignReset noPaddingTop>
        <Container>
          <div className={breadcrumb}>
            <Link to={'/'}>HOME</Link>
            <span className={breadcrumbLinkSeperator}>&gt;</span>
            <Link to={`/schools/${school.slug.current}`}>{school.title}</Link>
            <span className={breadcrumbLinkSeperator}>&gt;</span>
            <div>{name}</div>
          </div>

          <h3 className={projectTitle}>{title}</h3>
          <h2 className={title}>{name}</h2>

          {downloadLink && (
            <>
              <div className={columnSection}>
                <DLLink target="_blank" href={downloadLink} variant="cta" label="Download Thesis" onClick={() => {}} />
              </div>
              <div className={divider} />
            </>
          )}

          {videoSpotlight && (
            <iframe
              src={`https://cdnapisec.kaltura.com/p/${process.env.GATSBY_KALTURA_PARTNER_ID}/sp/${process.env.GATSBY_KALTURA_PARTNER_ID}00/embedIframeJs/uiconf_id/${process.env.GATSBY_KALTURA_UICONF_ID}/partner_id/${process.env.GATSBY_KALTURA_PARTNER_ID}?iframeembed=true&playerId=kaltura_player_1625520477&entry_id=${ENTRY_ID}`}
              style={{ width: 640, height: 360, marginTop: '2em' }}
              allowFullScreen
              webkitallowfullscreen
              mozallowfullscreen
              frameBorder="0"
              id="kaltura_player_1625520477"
              allow="autoplay *; fullscreen *; encrypted-media *"
            />
          )}
          {carouselData && <Carousel data={carouselData} />}
        </Container>
      </Section>
    </>
  );
}

export default ProjectProfile;
