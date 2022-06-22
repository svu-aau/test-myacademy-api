/* eslint-disable react/display-name */
import React from 'react';
import { Link, navigate } from 'gatsby';
import { Button } from '@aauweb/design-library';
import Figure from './figure';
import * as typographyStyles from '../styles/typography.module.css';
import * as serializerStyles from './serializers.module.css';
import softSearch from '../utils/linkHelper';
import clientConfig from '../../client-config';

const BlockTypes = {
  // Customize block types with ease
  h1: ({ children }) => <h1 className={typographyStyles['responsiveTitle1']}>{children}</h1>,
  h2: ({ children }) => <h2 className={typographyStyles['responsiveTitle2']}>{children}</h2>,
  large: ({ children }) => <h2 className={typographyStyles['large']}>{children}</h2>,
  huge: ({ children }) => <h2 className={typographyStyles['responsiveTitleHuge']}>{children}</h2>,
  h3: ({ children }) => <h3 className={typographyStyles['responsiveTitle3']}>{children}</h3>,
  h4: ({ children }) => <h4 className={typographyStyles['responsiveTitle4']}>{children}</h4>,
  h5: ({ children }) => <h5 className={typographyStyles.macro}>{children}</h5>,
  blockquote: ({ children }) => <blockquote className={typographyStyles.blockQuote}>{children}</blockquote>,
  macro: ({ children }) => <h5 className={typographyStyles.macro}>{children}</h5>,
  h6: ({ children }) => <h6 className={typographyStyles.micro}>{children}</h6>,
  micro: ({ children }) => <h6 className={typographyStyles.micro}>{children}</h6>,
  normal: ({ children }) => <p className={typographyStyles.paragraph}>{children}</p>,
  small: ({ children }) => <p className={typographyStyles.small}>{children}</p>,
};

export const isExternalLink = (href) => {
  return (
    href &&
    (href.indexOf('http:') === 0 ||
      href.indexOf('https:') === 0 ||
      href.indexOf('mailto:') === 0 ||
      href.indexOf('tel:') === 0)
  );
};

export const linkUrlParser = (href) => {
  let hrefSplit = [];
  if (href) {
    hrefSplit = href.split('/');
  }
  const result =
    softSearch(clientConfig.gatsby.siteUrl.replace('https://', ''), hrefSplit) ||
    softSearch(clientConfig.gatsby.previewUrl.replace('https://', ''), hrefSplit) ||
    softSearch(clientConfig.gatsby.stagingUrl.replace('https://', ''), hrefSplit);
  if (result) {
    hrefSplit.splice(0, result[1] + 1);
    href = `/${hrefSplit.join('/')}`;
  }
  return href;
};

const serializers = {
  // Text styles
  block: BlockTypes,
  types: {
    // Images
    figure: Figure,

    // custom HTML
    embedHTML(props) {
      // hack for vids that where added using embed html option before embedvideo existed
      if (props.value.html.includes('youtube') || props.value.html.includes('vimeo')) {
        return (
          <div className={serializerStyles.videoContainer}>
            <div dangerouslySetInnerHTML={{ __html: props.value.html }} />
          </div>
        );
      }
      return <div dangerouslySetInnerHTML={{ __html: props.value.html }} />;
    },

    // custom Video Embed use responsive wrapper
    embedVideo(props) {
      return (
        <div className={serializerStyles.videoContainer}>
          <div dangerouslySetInnerHTML={{ __html: props.value.html }} />
        </div>
      );
    },
  },
  marks: {
    // normal links
    link: ({ value: { href, style, alignment }, children }) => {
      // console.log('external link: ', href, style, alignment);
      const linkStyle = serializerStyles[style] || serializerStyles.link;
      const alignmentStyle = serializerStyles[alignment] || '';
      const isButton = ['darkButton', 'button', 'secondaryButton'].includes(style);

      const link = linkUrlParser(href);
      if (isButton) {
        return (
          <span className={alignmentStyle}>
            <Button
              variant={style === 'secondaryButton' ? 'outlined' : 'contained'}
              color="primary"
              label={children}
              onClick={() => {
                if (isExternalLink(link)) {
                  window.open(link, '_blank');
                } else {
                  navigate(link);
                }
              }}
            >
              {children}
            </Button>
          </span>
        );
      } else {
        if (link && !isExternalLink(link)) {
          return (
            <Link to={link} className={linkStyle}>
              {children}
            </Link>
          );
        } else {
          return (
            <a
              href={link}
              className={linkStyle}
              target={link && isExternalLink(link) ? '_blank' : ''}
              rel={link && isExternalLink(link) ? 'noopener' : ''}
            >
              {children}
            </a>
          );
        }
      }
    },

    // centered text content
    textCenter: ({ children }) => {
      // use an inline element to avoid invalid dom nesting, fixes
      // https://github.com/sanity-io/block-content-to-react/issues/59
      return <span style={{ textAlign: 'center', display: 'block' }}>{children}</span>;
    },
    textLeft: ({ children }) => {
      return <span style={{ textAlign: 'left', display: 'block' }}>{children}</span>;
    },
    textRight: ({ children }) => {
      return <span style={{ textAlign: 'right', display: 'block' }}>{children}</span>;
    },

    // internal links
    internalLink: ({ value: { reference: ref, style }, children }) => {
      let href = null;
      let title = '';
      const linkStyle = serializerStyles[style] || serializerStyles.link;
      if (ref)
        switch (ref._type) {
          case 'student':
            href = '/schools/' + ref.school.slug.current + '/student/' + ref.slug.current;
            title = ref.name;
            break;

          case 'school':
            href = '/schools/' + ref.slug.current;
            title = ref.title;
            break;

          case 'page':
            href = '/' + ref.slug.current;
            title = ref.title;
            break;
        }
      // console.log(ref, children);
      if (style === 'secondaryButton') {
        return (
          <Button
            variant={style === 'secondaryButton' ? 'outlined' : 'contained'}
            color="primary"
            label={children}
            onClick={() => navigate(href)}
          >
            {children}
          </Button>
        );
      } else if (href) {
        return (
          <Link to={href} title={title} className={linkStyle}>
            {children}
          </Link>
        );
      } else return <span className={linkStyle}>{children}</span>;
    },
  },
};

export default serializers;
