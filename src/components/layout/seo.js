import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

// favicons
import mstile310x310 from '../../images/favicons/mstile-310x310.png';
import appletouchicon57x57 from '../../images/favicons/apple-touch-icon-57x57.png';
import appletouchicon60x60 from '../../images/favicons/apple-touch-icon-60x60.png';
import appletouchicon72x72 from '../../images/favicons/apple-touch-icon-72x72.png';
import appletouchicon76x76 from '../../images/favicons/apple-touch-icon-76x76.png';
import appletouchicon114x114 from '../../images/favicons/apple-touch-icon-114x114.png';
import appletouchicon120x120 from '../../images/favicons/apple-touch-icon-120x120.png';
import appletouchicon144x144 from '../../images/favicons/apple-touch-icon-144x144.png';
import appletouchicon152x152 from '../../images/favicons/apple-touch-icon-152x152.png';
import favicon16x16 from '../../images/favicons/favicon-16x16.png';
import favicon32x32 from '../../images/favicons/favicon-32x32.png';
import favicon96x96 from '../../images/favicons/favicon-96x96.png';
import favicon128 from '../../images/favicons/favicon-128.png';
import favicon196x196 from '../../images/favicons/favicon-196x196.png';
import favicon from '../../images/favicons/favicon.ico';
import mstile70x70 from '../../images/favicons/mstile-70x70.png';
import mstile144x144 from '../../images/favicons/mstile-144x144.png';
import mstile150x150 from '../../images/favicons/mstile-150x150.png';
import mstile310x150 from '../../images/favicons/mstile-310x150.png';

function SEO({
  description,
  lang,
  keywords,
  path = '/',
  title,
  seoImage,
  seoTitle = title,
  contentType = 'website',
  noindex = false,
}) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={({ gatsby: { config }, site, defaultShareImage }) => {
        const metaDescription = description || (site && site.description) || config.description || '';
        const siteTitle = (site && site.title) || config.title || '';
        const twitterUsername = config.userTwitter;
        const url = config.siteUrl + '/' + path;
        const shareImage =
          seoImage?.images?.fallback?.src ||
          config.siteUrl + '/' + defaultShareImage.childImageSharp.gatsbyImageData.src;

        return (
          <Helmet
            htmlAttributes={{ lang }}
            title={title}
            titleTemplate={title === siteTitle ? '%s' : `%s | ${siteTitle}`}
          >
            {noindex && <meta name="robots" content="noindex" />}
            {url && <meta property="og:url" content={url} />}
            {url && <link rel="canonical" href={url} />}

            {shareImage && <meta name="image" content={shareImage} />}
            {shareImage && <meta property="og:image" content={shareImage} />}
            {shareImage && <meta name="twitter:image" content={shareImage} />}

            <meta name="description" content={metaDescription} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:type" content={contentType} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={config.userTwitter} />
            {twitterUsername && <meta name="twitter:creator" content={twitterUsername} />}
            {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}

            <link rel="apple-touch-icon-precomposed" sizes="57x57" href={appletouchicon57x57} />
            <link rel="apple-touch-icon-precomposed" sizes="114x114" href={appletouchicon114x114} />
            <link rel="apple-touch-icon-precomposed" sizes="72x72" href={appletouchicon72x72} />
            <link rel="apple-touch-icon-precomposed" sizes="144x144" href={appletouchicon144x144} />
            <link rel="apple-touch-icon-precomposed" sizes="60x60" href={appletouchicon60x60} />
            <link rel="apple-touch-icon-precomposed" sizes="120x120" href={appletouchicon120x120} />
            <link rel="apple-touch-icon-precomposed" sizes="76x76" href={appletouchicon76x76} />
            <link rel="apple-touch-icon-precomposed" sizes="152x152" href={appletouchicon152x152} />
            <link rel="icon" type="image/png" href={favicon196x196} sizes="196x196" />
            <link rel="icon" type="image/png" href={favicon96x96} sizes="96x96" />
            <link rel="icon" type="image/png" href={favicon32x32} sizes="32x32" />
            <link rel="icon" type="image/png" href={favicon16x16} sizes="16x16" />
            <link rel="icon" type="image/png" href={favicon128} sizes="128x128" />
            <meta name="application-name" content={siteTitle} />
            <meta name="msapplication-TileColor" content="#FFFFFF" />
            <meta name="msapplication-TileImage" content={mstile144x144} />
            <meta name="msapplication-square70x70logo" content={mstile70x70} />
            <meta name="msapplication-square150x150logo" content={mstile150x150} />
            <meta name="msapplication-wide310x150logo" content={mstile310x150} />
            <meta name="msapplication-square310x310logo" content={mstile310x310} />
          </Helmet>
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    gatsby: site {
      config: siteMetadata {
        siteUrl
        title
        description
        userTwitter
      }
    }
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
      keywords
    }
    defaultShareImage: file(relativePath: { eq: "share-image.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1200, placeholder: BLURRED, layout: FIXED)
      }
    }
  }
`;
