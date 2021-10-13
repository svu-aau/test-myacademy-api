import React from 'react';
import { Link } from 'gatsby';
import { Carousel, Hero, Link as DLLink } from '@aauweb/design-library';

import { projectTitle, divider, videoContainer, media } from './project-profile.module.css';
import { breadcrumbLinkSeperator, breadcrumb, columnSection } from '../layout/layout.module.css';
import Section from '../sections/section';
import Container from '../layout/container';

function ProjectProfile(props) {
  const { school, name, projects } = props;

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

          {projects?.length &&
            projects.map((project) => {
              const { download, title, gallery, videoSpotlight } = project;
              const downloadLink = download?.asset?.url;
              // kaltura vids won't embed / play locally so lets show a youtube video in development instead
              let videoUrl = `https://cdnapisec.kaltura.com/p/${process.env.GATSBY_KALTURA_PARTNER_ID}/sp/${process.env.GATSBY_KALTURA_PARTNER_ID}00/embedIframeJs/uiconf_id/${process.env.GATSBY_KALTURA_UICONF_ID}/partner_id/${process.env.GATSBY_KALTURA_PARTNER_ID}?iframeembed=true&playerId=kaltura_player_1625520477&entry_id=${videoSpotlight}`;
              if (process.env.NODE_ENV === 'development') {
                videoUrl = 'https://www.youtube.com/embed/hY7m5jjJ9mM';
              }

              // console.log('gallery data: ', gallery);
              const carouselData = gallery.map((item) => ({
                id: item._key,
                image: item.asset?.url,
              }));
              return (
                <>
                  <h3 className={projectTitle}>{title}</h3>
                  <h2 className={title}>{name}</h2>
                  <div className={media}>
                    {downloadLink && (
                      <>
                        <div className={columnSection}>
                          <DLLink
                            target="_blank"
                            href={downloadLink}
                            variant="cta"
                            label="Download Thesis"
                            onClick={() => {}}
                          />
                        </div>
                        <div className={divider} />
                      </>
                    )}

                    {videoSpotlight && (
                      <div className={videoContainer}>
                        <iframe
                          src={videoUrl}
                          style={{ width: '100%', height: '100%' }}
                          allowFullScreen
                          webkitallowfullscreen
                          mozallowfullscreen
                          frameBorder="0"
                          id="kaltura_player_1625520477"
                          allow="autoplay *; fullscreen *; encrypted-media *"
                        />
                      </div>
                    )}
                    {carouselData && <Carousel data={carouselData} />}
                  </div>
                </>
              );
            })}
        </Container>
      </Section>
    </>
  );
}

export default ProjectProfile;
