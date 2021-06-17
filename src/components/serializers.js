/* eslint-disable react/display-name */
import React from 'react';
import Figure from './figure';
import BlockContent from '@sanity/block-content-to-react';
import typographyStyles from '../styles/typography.module.css';
import serializerStyles from './serializers.module.css';
import { Link } from 'gatsby';
import { imageUrlFor } from '../lib/image-url';

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
      return <blockquote className={typographyStyles.blockquote}>{props.children}</blockquote>;

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

const serializers = {
  types: {
    // Text styles
    block: BlockRenderer,

    // Images
    figure: Figure,

    // custom HTML
    embedHTML(props) {
      return <div dangerouslySetInnerHTML={{ __html: props.node.html }} />;
    },
  },
  marks: {
    // normal links
    link: ({ mark: { href, style }, children }) => {
      const linkStyle = serializerStyles[style] || serializerStyles.link;
      // console.log({ linkStyle })
      if (href && href.indexOf('http') === 0) {
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

  textCenter: ({ children }) => {
    return <span style={{ display: 'block', textAlign: 'center' }}>{children}</span>;
  },

  // block: BlockRenderer
};

export default serializers;
