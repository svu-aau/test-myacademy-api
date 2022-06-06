import React from 'react';
import { SectionHeader } from '@aauweb/design-library';
import BlockContent from '../block-content';
import { root } from './section-library-profile.module.css';
import { urlFor } from '../../utils/tools';

const SectionLibraryHeader = ({ section }) => {
  const {
    sectionHeaderImage,
    alt,
    _rawSectionHeaderDesc,
    download,
    downloadLinkText,
    internalLink,
    externalLink,
    _key,
  } = section;

  let isLoginPage = typeof window !== 'undefined' && window.location.pathname.match(/^\/login\/?$/) ? true
    : false;

  return (
    <div className={root + (isLoginPage ? ' login' : '')} id={_key}>
      <SectionHeader
        headerImg={urlFor(sectionHeaderImage.asset.url).auto('format').fit('max').url()}
        imgAlt={sectionHeaderImage.alt}
        title={alt}
        file={download}
        link={internalLink?.slug ? `/${internalLink.slug.current}` : externalLink}
        linkTxt={downloadLinkText}
      >
        {_rawSectionHeaderDesc && <BlockContent blocks={_rawSectionHeaderDesc} />}
      </SectionHeader>
    </div>
  );
};

export default SectionLibraryHeader;
