import React from 'react';
import { Profile } from '@aauweb/design-library';
import { root } from './section-library-profile.module.css';
import { urlFor } from '../../utils/tools';

const SectionLibraryProfile = ({ section }) => {
  const { profileImage, alt, backgroundColor, profileDesc, profileJob, profileName, contactBtnText, route, link } =
    section;
  const profileLink = link || (route?.slug?.current && `/${route.slug.current}`);
  return (
    <div className={root}>
      <Profile
        profileImage={urlFor(profileImage.asset.url).auto('format').fit('max').url()}
        imgAlt={profileImage.alt}
        title={alt}
        backgroundColor={backgroundColor?.value}
        desc={profileDesc}
        job={profileJob}
        name={profileName}
        btnTxt={contactBtnText}
        link={profileLink}
      />
    </div>
  );
};

export default SectionLibraryProfile;
