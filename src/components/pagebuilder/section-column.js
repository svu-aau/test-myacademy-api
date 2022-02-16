import React from 'react';
import { navigate } from 'gatsby';
import { Button } from '@aauweb/design-library';
import Container from '../layout/container';
import Section from '../sections/section';
import ContentSections from './content-sections';
import { columnBtnContainer } from './section-column.module.css';

// see data/fragments/PageContent
const SectionColumn = ({ section, noPadding }) => {
  const {
    _key,
    backgroundColor,
    narrowWidth,
    sectionLeft,
    sectionRight,
    sectionThird,
    title,
    route,
    link,
    buttonText,
  } = section;
  const btnLink = link || (route?.slug?.current && `/${route.slug.current}`);
  const isThreeCol = sectionThird ? true : false;

  return (
    <Section id={section._key} key={_key} color={backgroundColor?.value} noPadding={!noPadding}>
      <h1>{title}</h1>
      <Container narrow={narrowWidth} threeColumn={isThreeCol} split={!isThreeCol}>
        <div>
          <ContentSections content={sectionLeft} noPaddingTop />
        </div>
        <div>
          <ContentSections content={sectionRight} noPaddingTop />
        </div>
        {sectionThird && (
          <div>
            <ContentSections content={sectionThird} noPaddingTop />
          </div>
        )}
      </Container>
      {buttonText && (
        <div className={columnBtnContainer}>
          <Button variant="outlined" color="primary" label={buttonText} onClick={() => navigate(btnLink)} />
        </div>
      )}
    </Section>
  );
};

export default SectionColumn;
