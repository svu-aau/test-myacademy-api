import React from 'react';
import { SectionHeader } from '@aauweb/design-library';
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
        desc={_rawSectionHeaderDesc}
        file={download}
        linkTxt={downloadLinkText}
        dataset="my-academy"
      />
    </div>
  );
};

export default SectionLibraryHeader;
