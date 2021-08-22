/* eslint-disable react/display-name */
import React from 'react';
import Figure from './figure';
import BlockContent from '@sanity/block-content-to-react';
import * as typographyStyles from '../styles/typography.module.css';
import * as serializerStyles from './serializers.module.css';
import { Link } from 'gatsby';
import softSearch from '../utils/linkHelper';

const BlockRenderer = (props) => {
  const { style = 'normal' } = props.node;

  switch (style) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
      return React.createElement(
        style,
        { className: typographyStyles['responsiveTitle' + style.replace(/[^\d]/g, '')] },
        props.children
      );

    case 'blockquote':
      return <blockquote className={typographyStyles.blockQuote}>{props.children}</blockquote>;

    case 'normal':
      return <p className={typographyStyles.paragraph}>{props.children}</p>;

    case 'h5':
    case 'macro':
      return <h5 className={typographyStyles.macro}>{props.children}</h5>;

    case 'h6':
    case 'micro':
      return <h6 className={typographyStyles.micro}>{props.children}</h6>;

    case 'large':
      return <h2 className={typographyStyles.large}>{props.children}</h2>;

    case 'small':
      return <p className={typographyStyles.small}>{props.children}</p>;

    case 'huge':
      return <h2 className={typographyStyles.responsiveTitleHuge}>{props.children}</h2>;

    default:
      return BlockContent.defaultSerializers.types.block(props);
  }
};

const isExternalHrefPattern = (href) => {
  return href.indexOf('http:') === 0 || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0;
};

const serializers = {
  types: {
    // Text styles
    block: BlockRenderer,

    // Images
    figure: Figure,

    // custom HTML
    embedHTML(props) {
      // hack for vids that where added using embed html option before embedvideo existed
      if (props.node.html.includes('youtube') || props.node.html.includes('vimeo')) {
        return (
          <div className={serializerStyles.videoContainer}>
            <div dangerouslySetInnerHTML={{ __html: props.node.html }} />
          </div>
        );
      }
      return <div dangerouslySetInnerHTML={{ __html: props.node.html }} />;
    },

    // custom Video Embed use responsive wrapper
    embedVideo(props) {
      return (
        <div className={serializerStyles.videoContainer}>
          <div dangerouslySetInnerHTML={{ __html: props.node.html }} />
        </div>
      );
    },
  },
  marks: {
    // normal links
    link: ({ mark: { href, style }, children }) => {
      const linkStyle = serializerStyles[style] || serializerStyles.link;

      let hrefSplit = href.split('/');
      const result = softSearch('gradshowcase.academyart.edu', hrefSplit);

      // console.log('result: ', result);

      let isInternalLink = false;
      if (result) {
        isInternalLink = true;
        hrefSplit.splice(0, result[1] + 1);
        href = `/${hrefSplit.join('/')}`;
      }

      // console.log('href: ', href);

      if (href && isInternalLink && !isExternalHrefPattern(href)) {
        // todo: hack to replace underscores in content links that should be dashes until cms has dashes
        href = href.replace(/_/g, '-');
        return (
          <Link to={href} className={linkStyle}>
            {children}
          </Link>
        );
      } else if (href && isExternalHrefPattern(href)) {
        return (
          <a href={href} className={linkStyle} target="_blank" rel="noopener">
            {children}
          </a>
        );
      } else {
        return (
          <a href={href} className={linkStyle}>
            {children}
          </a>
        );
      }
    },

    // centered text content
    textCenter: ({ children }) => {
      return <div style={{ textAlign: 'center' }}>{children}</div>;
    },

    // internal links
    internalLink: ({ mark: { reference: ref, style }, children }) => {
      let href = null;
      let title = '';
      const linkStyle = serializerStyles[style] || serializerStyles.link;
      if (ref)
        switch (ref._type) {
          case 'project':
            href = '/schools/' + ref.school.slug.current + '/projects/' + ref.slug.current;
            title = ref.title;
            break;

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
      if (href)
        return (
          <Link to={href} title={title} className={linkStyle}>
            {children}
          </Link>
        );
      else return <span className={linkStyle}>{children}</span>;
    },
  },

  // block: BlockRenderer
};

export default serializers;
