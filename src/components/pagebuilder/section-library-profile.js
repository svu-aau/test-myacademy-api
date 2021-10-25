import React from 'react';
import { Profile } from '@aauweb/design-library';
import { root } from './section-library-profile.module.css';
import { urlFor } from '../../utils/tools';

const SectionLibraryProfile = ({ section }) => {
  const { profileImage, profileTitle, backgroundColor, profileDesc, profileJob, profileName, route, link } = section;
  const profileLink = link || (route?.slug?.current && `/${route.slug.current}`);
  return (
    <div className={root}>
      <Profile
        profileImage={urlFor(profileImage.asset.url).auto('format').fit('max').url()}
        title={profileTitle}
        backgroundColor={backgroundColor?.value}
        desc={profileDesc}
        job={profileJob}
        name={profileName}
        link={profileLink}
      />
    </div>
  );
};

export default SectionLibraryProfile;
