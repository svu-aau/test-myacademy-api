import React, { useRef } from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import { buildImageObj, cn, emptyValues, sortByTitle } from '../../lib/helpers';
import BlockContent from '../block-content';
import styles from './student-profile.module.css';
import layoutStyles from '../layout/layout.module.css';
import { generateSocialLinks, ConditionalWrapper } from '../../utils/tools';
import Img from 'gatsby-image';
import Lightbox from '../lightbox';
import PortfolioGrid from '../grids/portfolio-grid';
import VideoPlayer from '../video-player';
import ContactUs from '../sections/contact-us';
import ContactForm from '../forms/contact-form';
import StudentNav from './student-nav';
import { imageUrlFor } from '../../lib/image-url';
import Section from '../sections/section';
import IndustryGrid from '../sections/industry-grid';

function StudentProfile(props) {
  // console.log('student profile props: ', props);
  const {
    id: studentId,
    _id,
    _rawBio,
    _rawDescription,
    name,
    degree,
    major,
    embedCode,
    school,
    awards,
    instructors,
    heroImage,
    portfolio,
    resume,
    externalSiteUrls,
    collabProjects,
    additionalPortfolioUrls,
  } = props;

  const lightbox = useRef();
  const isArchitecture = school.title.trim().toLowerCase() === 'architecture';
  const { hiringCompanies } = school;

  let extraVideos = [];

  if (additionalPortfolioUrls && additionalPortfolioUrls.length) {
    extraVideos = additionalPortfolioUrls.map((url, i) => ({
      _type: 'video',
      _key: `extraVideo${i}`,
      url,
    }));
  }

  const media = [...portfolio, ...extraVideos];

  const filteredHeroImages = [];

  heroImage?.length > 0 &&
    heroImage.forEach((hero, idx) => {
      if (hero?.isHeadShot) {
        filteredHeroImages[idx] = heroImage[0];
        filteredHeroImages[0] = hero;
      } else {
        filteredHeroImages[idx] = hero;
      }
    });

  let collabHeroes = [];
  if (isArchitecture && collabProjects && collabProjects.length > 0) {
    collabHeroes = sortByTitle(collabProjects).map((project) => project.heroImage && project.heroImage[0]);
  }

  return (
    <StaticQuery
      query={graphql`
        query {
          facebookColorIcon: file(relativePath: { eq: "social/facebook@2x.png" }) {
            childImageSharp {
              fixed(width: 46) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
          instagramColorIcon: file(relativePath: { eq: "social/instagram@2x.png" }) {
            childImageSharp {
              fixed(width: 46) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
          twitterColorIcon: file(relativePath: { eq: "social/twitter@2x.png" }) {
            childImageSharp {
              fixed(width: 46) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
          linkedinColorIcon: file(relativePath: { eq: "social/linkedin@2x.png" }) {
            childImageSharp {
              fixed(width: 46) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
          pinterestColorIcon: file(relativePath: { eq: "social/pinterest@2x.png" }) {
            childImageSharp {
              fixed(width: 46) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
          behanceColorIcon: file(relativePath: { eq: "social/behance@2x.png" }) {
            childImageSharp {
              fixed(width: 46) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
          snapchatColorIcon: file(relativePath: { eq: "social/snapchat@2x.png" }) {
            childImageSharp {
              fixed(width: 46) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
          whatsappColorIcon: file(relativePath: { eq: "social/whatsapp@2x.png" }) {
            childImageSharp {
              fixed(width: 46) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
          youtubeColorIcon: file(relativePath: { eq: "social/youtube@2x.png" }) {
            childImageSharp {
              fixed(width: 46) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
        }
      `}
      render={({
        behanceIconColor,
        facebookColorIcon,
        instagramColorIcon,
        linkedinColorIcon,
        twitterColorIcon,
        pinterestColorIcon,
        snapchatColorIcon,
        whatsappColorIcon,
        youtubeColorIcon,
      }) => {
        return (
          <div>
            <article className={layoutStyles.columnWrapper}>
              <div className={layoutStyles.leftColumn}>
                {filteredHeroImages?.length > 0 &&
                  filteredHeroImages.map((hero, idx) => {
                    return (
                      <button
                        type="button"
                        key={idx}
                        className={cn(layoutStyles.mediaInteractWrapper, layoutStyles.mediaInteractWrapperHero)}
                        onClick={() => lightbox.current.openItem(0)}
                      >
                        {hero.image && hero.image.asset && (
                          <>
                            <Img
                              className={styles.mainImage}
                              fluid={hero.image.asset.fluid}
                              alt={hero.alt || 'hero image'}
                              imgStyle={{ objectFit: 'contain' }}
                            />
                            <div className={layoutStyles.preloadHidden}>
                              <img
                                src={imageUrlFor(buildImageObj(hero.image)).url()}
                                width="1"
                                height="1"
                                alt="Hidden preload image"
                              />
                            </div>
                            {hero.caption && hero.caption.trim() !== '' && (
                              <div className={layoutStyles.caption}>{hero.caption}</div>
                            )}
                          </>
                        )}
                        {hero._type === 'video' && hero.url && <VideoPlayer url={hero.url} thumbnail />}
                      </button>
                    );
                  })}

                {isArchitecture && collabProjects && collabProjects.length > 0 && (
                  <div>
                    <h4 className={styles.sectionTitle}>Student Projects</h4>

                    {sortByTitle(collabProjects).map(
                      (project) =>
                        project.heroImage &&
                        project.heroImage[0] &&
                        project.heroImage[0].image && (
                          <div key={project.heroImage[0]._key} className={styles.mainImage}>
                            <ConditionalWrapper
                              condition={project.school && project.school.slug && project.slug}
                              wrapper={(children) => (
                                <Link
                                  className={styles.collabProjectsLink}
                                  to={`/schools/${project.school.slug.current}/projects/${project.slug.current}`}
                                >
                                  {children}
                                </Link>
                              )}
                            >
                              <Img
                                fluid={project.heroImage[0].image.asset.fluid}
                                alt={project.heroImage[0].alt}
                                imgStyle={{ objectFit: 'contain' }}
                              />
                              <div className={layoutStyles.preloadHidden}>
                                <img
                                  src={imageUrlFor(buildImageObj(project.heroImage[0])).url()}
                                  width="1"
                                  height="1"
                                  alt="Hidden preload image"
                                />
                              </div>
                            </ConditionalWrapper>
                          </div>
                        )
                    )}
                  </div>
                )}

                {isArchitecture && media.length > 0 && <h4 className={styles.sectionTitle}>Student work</h4>}

                <PortfolioGrid
                  media={media}
                  showDescription={isArchitecture}
                  onItemClick={(idx) => lightbox.current.openItem(idx + 1)}
                />

                <Lightbox ref={lightbox} media={[...heroImage, ...collabHeroes, ...media]} />

                {embedCode && <div className={styles.embedCode} dangerouslySetInnerHTML={{ __html: embedCode }} />}
              </div>
              <div className={layoutStyles.rightColumn}>
                <div className={layoutStyles.breadcrumb}>
                  <Link to={'/'}>HOME</Link>
                  <span className={layoutStyles.breadcrumbLinkSeperator}>&gt;</span>
                  <Link to={`/schools/${school.slug.current}`}>{school.title}</Link>
                  <span className={layoutStyles.breadcrumbLinkSeperator}>&gt;</span>
                  <div className={layoutStyles.breadcrumbLink}>{name}</div>
                </div>
                <h1 className={layoutStyles.title}>{name}</h1>
                <div className={layoutStyles.subTitle}>
                  {!isArchitecture && school ? `${school.title} /` : null} {degree ? degree.code : null}
                </div>

                {_rawBio && (
                  <div className={layoutStyles.bio}>
                    <BlockContent blocks={_rawBio || []} />
                  </div>
                )}

                {awards && awards.length > 0 && !emptyValues(awards) && (
                  <div className={layoutStyles.columnSection}>
                    <div className={layoutStyles.subTitle}>Awards</div>
                    {awards.map((award, idx) => (
                      <div key={idx}>{award}</div>
                    ))}
                  </div>
                )}

                <ContactForm studentName={name} studentId={_id} />

                {externalSiteUrls && (
                  <div className={cn(styles.externalUrls, layoutStyles.columnSection)}>
                    {externalSiteUrls &&
                      generateSocialLinks(externalSiteUrls, {
                        behance: behanceIconColor,
                        facebook: facebookColorIcon,
                        instagram: instagramColorIcon,
                        linkedin: linkedinColorIcon,
                        pinterest: pinterestColorIcon,
                        snapchat: snapchatColorIcon,
                        twitter: twitterColorIcon,
                        whatsapp: whatsappColorIcon,
                        youtube: youtubeColorIcon,
                      })}
                  </div>
                )}

                {resume && resume.asset && (
                  <div className={layoutStyles.columnSection}>
                    <a
                      style={{ textDecoration: 'underline' }}
                      target="_blank"
                      rel="noopener"
                      href={`${resume.asset.url}`}
                    >
                      Download R&eacute;sum&eacute;
                    </a>
                  </div>
                )}

                {isArchitecture && instructors && instructors.length > 0 && !emptyValues(instructors) && (
                  <div className={layoutStyles.columnSection}>
                    <div className={layoutStyles.subTitle}>Faculty</div>
                    {instructors.map((instructor, idx) => (
                      <div key={idx}>{instructor}</div>
                    ))}
                  </div>
                )}

                {_rawDescription && (
                  <div className={layoutStyles.columnSection}>
                    <BlockContent blocks={_rawDescription || []} />
                  </div>
                )}

                <StudentNav schoolSlug={school.slug.current} studentId={studentId} />

                {!isArchitecture && collabProjects && collabProjects.length > 0 && (
                  <div className={layoutStyles.columnSection}>
                    <h4>Collaborative Projects</h4>

                    {sortByTitle(collabProjects).map(
                      (project) =>
                        project.heroImage &&
                        project.heroImage[0] &&
                        project.heroImage[0].image && (
                          <div key={project.heroImage[0]._key} className={styles.mainImage}>
                            <ConditionalWrapper
                              condition={project.school && project.school.slug && project.slug}
                              wrapper={(children) => (
                                <Link
                                  className={styles.collabProjectsLink}
                                  to={`/schools/${project.school.slug.current}/projects/${project.slug.current}`}
                                >
                                  {children}
                                </Link>
                              )}
                            >
                              <Img
                                fluid={project.heroImage[0].image.asset.fluid}
                                alt={project.heroImage[0].alt}
                                imgStyle={{ objectFit: 'contain' }}
                              />
                              <div className={layoutStyles.preloadHidden}>
                                <img
                                  src={imageUrlFor(buildImageObj(project.heroImage[0])).url()}
                                  width="1"
                                  height="1"
                                  alt="Hidden preload image"
                                />
                              </div>
                            </ConditionalWrapper>
                          </div>
                        )
                    )}
                  </div>
                )}
              </div>
            </article>
            <Section>
              <IndustryGrid hiringCompanies={hiringCompanies} />
            </Section>
            <ContactUs />
          </div>
        );
      }}
    />
  );
}

export default StudentProfile;
