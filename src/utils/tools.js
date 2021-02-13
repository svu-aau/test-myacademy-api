import Img from 'gatsby-image';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

export function generateColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

// prepend http in case they didnt include it
export function addHttp(url) {
  if (url && !/^(?:f|ht)tps?:\/\//.test(url)) {
    url = 'http://' + url;
  }
  return url;
}

function getProvider(string) {
  if (string) {
    if (string.includes('facebook')) {
      return 'facebook';
    }
    if (string.includes('twitter')) {
      return 'twitter';
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
    if (string.includes('weheartit')) {
      return 'weheartit';
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
  return (
    <>
      {urls.map((url, idx) => {
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
                  View Additional Work (External Site)
                  <FontAwesomeIcon style={{ marginLeft: '.5em' }} icon={faLink} />
                </a>
              )
            );
          })}
        </div>
      )}
      {found.length > 0 && (
        <div style={{ marginTop: '.5em' }}>
          {found.map(({ url, providerImage, provider }, idx) => {
            if (providerImage && providerImage.childImageSharp) {
              return (
                <a key={idx} target="_blank" rel="noopener" href={addHttp(url)}>
                  <Img fixed={providerImage.childImageSharp.fixed} alt={`${provider} Icon`} />
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
        </div>
      )}
    </>
  );
}

export const ConditionalWrapper = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children);
