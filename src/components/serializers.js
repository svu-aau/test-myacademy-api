/* eslint-disable react/display-name */
import React from 'react';
import { Link, navigate } from 'gatsby';
import { Button } from '@aauweb/design-library';
import Figure from './figure';
import * as typographyStyles from '../styles/typography.module.css';
import * as serializerStyles from './serializers.module.css';
import softSearch from '../utils/linkHelper';

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

export const isExternalHrefPattern = (href) => {
  return (
    href.indexOf('http:') === 0 ||
    href.indexOf('https:') === 0 ||
    href.indexOf('mailto:') === 0 ||
    href.indexOf('tel:') === 0
  );
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
    link: ({ value: { href, style }, children }) => {
      // console.log('external link: ', href, children);
      const linkStyle = serializerStyles[style] || serializerStyles.link;
      const isButton = ['darkButton', 'button', 'secondaryButton'].includes(style);

      let hrefSplit = href.split('/');
      const result = softSearch('aa-myacademy-web.vercel.app', hrefSplit);

      // console.log('result: ', result);

      let isInternalLink = false;
      if (result) {
        isInternalLink = true;
        hrefSplit.splice(0, result[1] + 1);
        href = `/${hrefSplit.join('/')}`;
      }
      if (isButton) {
        return (
          <Button
            variant={style === 'secondaryButton' ? 'outlined' : 'contained'}
            color="primary"
            label={children}
            onClick={() => {
              if (!isInternalLink || isExternalHrefPattern(href)) {
                window.open(href, '_blank');
              } else {
                navigate(href);
              }
            }}
          >
            {children}
          </Button>
        );
      } else {
        if (href && (isInternalLink || !isExternalHrefPattern(href))) {
          // todo: hack to replace underscores in content links that should be dashes until cms has dashes
          href = href.replace(/_/g, '-');
          return (
            <Link to={href} className={linkStyle}>
              {children}
            </Link>
          );
        } else {
          return (
            <a
              href={href}
              className={linkStyle}
              target={href && isExternalHrefPattern(href) ? '_blank' : ''}
              rel={href && isExternalHrefPattern(href) ? 'noopener' : ''}
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
