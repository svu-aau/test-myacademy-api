import React from 'react';

import { CardGrid } from '@aauweb/design-library';
import BlockContent from '../block-content';
import { root } from './section-library-card.module.css';

const SectionLibraryCard = ({ section }) => {
  const { heroImage, _rawCaption, href, title, kalturaID } = section;

  const data = [
    {
      alt: heroImage.alt,
      buttonText: 'Learn More',
      children: <BlockContent blocks={_rawCaption} />,
      href,
      image: heroImage.asset.fluid.src,
      title,
      iframe:
        kalturaID &&
        `https://cdnapisec.kaltura.com/p/${process.env.GATSBY_KALTURA_PARTNER_ID}/sp/${process.env.GATSBY_KALTURA_PARTNER_ID}00/embedIframeJs/uiconf_id/${process.env.GATSBY_KALTURA_UICONF_ID}/partner_id/${process.env.GATSBY_KALTURA_PARTNER_ID}?iframeembed=true&playerId=kaltura_player_1625520477&entry_id=${kalturaID}`,
      iframeProps: kalturaID && {
        style: {
          border: 0,
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
        },
        allowFullScreen: true,
        webkitallowfullscreen: 'true',
        mozallowfullscreen: 'true',
        frameBorder: '0',
        id: 'kaltura_player_1625520477',
        allow: 'autoplay *; fullscreen *; encrypted-media *',
      },
    },
  ];

  return (
    <div className={root} key={section._key}>
      <CardGrid data={data} />
    </div>
  );
};

export default SectionLibraryCard;
