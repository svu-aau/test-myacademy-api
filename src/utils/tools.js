import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import myConfiguredSanityClient from '../../client-config';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(myConfiguredSanityClient.sanity);

export function urlFor(source) {
  return builder.image(source);
}

export function generateColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;
}

/*
function removeWhiteSpace(text) {

}
*/

// prepend http in case they didnt include it
export function addHttp(url) {
  if (url && !/^(?:f|ht)tps?:\/\//.test(url)) {
    url = 'http://' + url;
  }
  return url;
}

function getProvider(string) {
  if (string) {
    if (string.includes('behance')) {
      return 'behance';
    }
    if (string.includes('facebook')) {
      return 'facebook';
    }
    if (string.includes('twitter')) {
      return 'twitter';
    }
    if (string.includes('vimeo')) {
      return 'vimeo';
    }
    if (string.includes('youtube')) {
      return 'youtube';
    }
    if (string.includes('instagram')) {
      return 'instagram';
    }
    if (string.includes('pinterest')) {
      return 'pinterest';
    }
    if (string.includes('spotify')) {
      return 'spotify';
    }
    if (string.includes('snapchat')) {
      return 'snapchat';
    }
    if (string.includes('tiktok')) {
      return 'tiktok';
    }
    if (string.includes('linkedin')) {
      return 'linkedin';
    }
  }
  return 'default';
}

function getProviderImage(url, providerToIcons, provider) {
  return providerToIcons[provider] || null;
}

export function generateSocialLinks(urls, providerToIcons) {
  const notFound = [];
  const found = [];
  const parsedUrls = handleUrlParse(urls);

  return (
    <>
      {parsedUrls.map((url, idx) => {
        const provider = getProvider(url);
        const providerImage = getProviderImage(url, providerToIcons, provider);
        if (!providerImage) {
          notFound.push(url);
        } else {
          found.push({ url, providerImage, provider });
        }
        return null;
      })}
      {notFound.length > 0 && (
        <div style={{ display: 'block' }}>
          {notFound.map((url, idx) => {
            if (isValidUrl(url)) {
              const provider = getProvider(url);
              let linkTitle = url;

              url.trimLeft();

              if (hasWhiteSpace(url)) {
                url = url.split(' ')[0] ? url.split(' ')[0] : url.split(' ')[1];
              }

              let { hostname } = new URL(url);

              if (hostname && !hostname.includes('www.')) {
                linkTitle = hostname;
              } else if (hostname && hostname.includes('www.')) {
                linkTitle = hostname.replace('www.', '');
              }

              if (provider === 'behance') {
                linkTitle = 'View Behance Portfolio';
              }
              if (provider === 'facebook') {
                linkTitle = 'View Facebook Account';
              }
              if (provider === 'instagram') {
                linkTitle = 'View Instagram Account';
              }
              if (provider === 'linkedin') {
                linkTitle = 'View LinkedIn Account';
              }
              if (provider === 'pinterest') {
                linkTitle = 'View Pinterest Account';
              }
              if (provider === 'snapchat') {
                linkTitle = 'View Snapchat Account';
              }
              if (provider === 'twitter') {
                linkTitle = 'View Twitter Account';
              }
              if (provider === 'vimeo') {
                linkTitle = 'View Vimeo Channel';
              }
              if (provider === 'youtube') {
                linkTitle = 'View YouTube Channel';
              }

              return (
                url &&
                url.length > 0 && (
                  <a
                    style={{ display: 'block', textDecoration: 'underline' }}
                    key={idx}
                    target="_blank"
                    rel="noopener"
                    href={addHttp(url)}
                  >
                    {linkTitle}
                    <FontAwesomeIcon style={{ marginLeft: '.5em' }} icon={faLink} />
                  </a>
                )
              );
            }
          })}
        </div>
      )}
      {found.length > 0 &&
        found.map(({ url, providerImage, provider }, idx) => {
          if (providerImage && providerImage.childImageSharp) {
            return (
              <a key={idx} target="_blank" rel="noopener" href={addHttp(url)}>
                <GatsbyImage image={providerImage.childImageSharp.gatsbyImageData} alt={`${provider} Icon`} />
              </a>
            );
          } else if (providerImage) {
            return (
              <a key={idx} target="_blank" rel="noopener" href={addHttp(url)}>
                <FontAwesomeIcon icon={providerImage} />
              </a>
            );
          }
        })}
    </>
  );
}

export const ConditionalWrapper = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children);

const handleUrlParse = (urls) => {
  const tempUrls = urls;

  tempUrls.map((url, idx) => {
    let splittedUrls = [];

    if (url?.includes(',')) {
      splittedUrls = url.split(',');
    } else if (url?.includes(' ')) {
      splittedUrls = url.split(' ');
    }

    splittedUrls.map((subUrl, subIdx) => {
      if (subIdx === 0) {
        tempUrls[idx] = subUrl.trim();
      } else {
        tempUrls.push(subUrl.trim());
      }
    });
  });

  return tempUrls;
};

const isValidUrl = (url) => {
  return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
};

const formatText = (content) => {
  let textArray = [];
  if (content?.body) {
    content.body.forEach(({ children }) => {
      if (children) {
        children.forEach(({ text }) => {
          if (text) {
            textArray.push(text);
          }
        });
      }
    });
  } else if (Array.isArray(content)) {
    if (content.length > 0) {
      content.forEach((inner) => {
        if (inner?.body) {
          inner.body.forEach(({ children }) => {
            if (children) {
              children.forEach(({ text }) => {
                if (text) {
                  textArray.push(text);
                }
              });
            }
          });
        }
      });
    }
  }

  return textArray;
};

export const handlePageMap = (props) => {
  const { content, slug } = props;
  const tempReturn = {
    ...props,
    body: formatText(content),
    slug: slug.current,
  };
  delete tempReturn.content;
  return tempReturn;
};
