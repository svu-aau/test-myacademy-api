import React from 'react';
import { SectionHeader } from '@aauweb/design-library';
import BlockContent from '../block-content';
import { root } from './section-library-profile.module.css';
import { urlFor } from '../../utils/tools';

const SectionLibraryHeader = ({ section }) => {
  const { sectionHeaderImage, alt, _rawSectionHeaderDesc, download, downloadLinkText } = section;
  return (
    <div className={root}>
      <SectionHeader
        headerImg={urlFor(sectionHeaderImage.asset.url).auto('format').fit('max').url()}
        imgAlt={sectionHeaderImage.alt}
        title={alt}
        file={download}
        linkTxt={downloadLinkText}
      >
        {_rawSectionHeaderDesc && <BlockContent blocks={_rawSectionHeaderDesc} />}
      </SectionHeader>
    </div>
  );
};

export default SectionLibraryHeader;
