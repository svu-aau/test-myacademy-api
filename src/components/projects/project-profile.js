import React, { useRef } from 'react';
import { Link } from 'gatsby';
import { buildImageObj, cn, emptyValues } from '../../lib/helpers';
import BlockContent from '../block-content';
import Img from 'gatsby-image';
import styles from './project-profile.module.css';
import layoutStyles from '../layout/layout.module.css';
import Lightbox from '../lightbox';
import PortfolioGrid from '../grids/portfolio-grid';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import VideoPlayer from '../video-player';
import ContactUs from '../sections/contact-us';
import { ConditionalWrapper } from '../../utils/tools';
import { imageUrlFor } from '../../lib/image-url';
import Section from '../sections/section';
import IndustryGrid from '../sections/industry-grid';

function ProjectProfile(props) {
  // console.log('Project props: ', props);
  const {
    _rawDescription,
    _rawIntro,
    _rawAdditionalInfo,
    subTitle,
    title,
    type,
    media,
    members,
    awards,
    instructors,
    heroImage,
    school,
  } = props;
  const lightbox = useRef();
  const isArchitecture = school.title.trim().toLowerCase() === 'architecture';
  const { hiringCompanies } = school;
  const mediaItems = [...heroImage, ...media];
  const hero = heroImage && heroImage[0];

  return (
    <div>
      <article className={layoutStyles.columnWrapper}>
        <div className={layoutStyles.leftColumn}>
          {hero && (
            <button
              type="button"
              className={cn(layoutStyles.mediaInteractWrapper, layoutStyles.mediaInteractWrapperHero)}
              onClick={() => lightbox.current.openItem(0)}
            >
              {hero.image && (
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
          )}

          {isArchitecture && _rawIntro && (
            <div className={layoutStyles.intro}>{_rawIntro && <BlockContent blocks={_rawIntro} />}</div>
          )}

          <PortfolioGrid
            media={media}
            showDescription={isArchitecture}
            onItemClick={(idx) => lightbox.current.openItem(idx + 1)}
          />
        </div>
        <div className={layoutStyles.rightColumn}>
          <div className={layoutStyles.breadcrumb}>
            <Link to={'/'}>HOME</Link>
            <span className={layoutStyles.breadcrumbLinkSeperator}>/</span>
            <Link to={'/projects'}>Projects</Link>
            <span className={layoutStyles.breadcrumbLinkSeperator}>/</span>
            <div className={layoutStyles.breadcrumbLink}>{title}</div>
          </div>
          <h1 className={layoutStyles.title}>{title}</h1>
          {isArchitecture && subTitle && <h2 className={layoutStyles.projectSubTitle}>{subTitle}</h2>}
          {isArchitecture && type && <h3 className={layoutStyles.subSubTitle}>{type}</h3>}
          {!isArchitecture && <div className={layoutStyles.subTitle}>Integrated Campaign</div>}
          {_rawDescription && (
            <div className={layoutStyles.bio}>{_rawDescription && <BlockContent blocks={_rawDescription || []} />}</div>
          )}
          {members && members.length > 0 && (
            <div className={layoutStyles.columnSection}>
              <div className={layoutStyles.subTitle}>Students</div>
              {members.map(
                (student) =>
                  student.person && (
                    <div key={student.person._id}>
                      <div className={styles.studentInfo}>
                        <ConditionalWrapper
                          condition={!student.person.hiddenProfile && student.person.slug}
                          wrapper={(children) => (
                            <Link
                              to={`/schools/${student.person.school.slug.current}/students/${student.person.slug.current}`}
                            >
                              {children}
                            </Link>
                          )}
                        >
                          {student.person.name} / {student.person?.degree?.code || null}{' '}
                          {(!isArchitecture && student.person?.major?.title) || null}
                        </ConditionalWrapper>
                        {student.person.resume && student.person.resume.asset && (
                          <div>
                            <a
                              target="_blank"
                              rel="noopener"
                              href={`${student.person.resume.asset.url}?dl=${student.person.name}-resume.pdf`}
                            >
                              <PictureAsPdfIcon className={styles.studentResumeIcon} />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )
              )}
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
          {awards && awards.length > 0 && !emptyValues(awards) && (
            <div className={layoutStyles.columnSection}>
              <div className={layoutStyles.subTitle}>Awards</div>
              {awards.map((award, idx) => (
                <div key={idx}>{award}</div>
              ))}
            </div>
          )}
          {isArchitecture && _rawAdditionalInfo && (
            <div className={layoutStyles.columnSectionBottom}>
              <BlockContent blocks={_rawAdditionalInfo || []} />
            </div>
          )}
        </div>
        <Lightbox ref={lightbox} media={mediaItems} />
      </article>
      <Section>
        <IndustryGrid hiringCompanies={hiringCompanies} />
      </Section>
      <ContactUs />
    </div>
  );
}

export default ProjectProfile;
