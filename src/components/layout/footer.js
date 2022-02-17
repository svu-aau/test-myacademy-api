import { graphql, Link, StaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { generateSocialLinks } from '../../utils/tools';
import MenuLink from './menu-link';

import ContentSections from '../pagebuilder/content-sections';

import {
  root,
  wrapper,
  addressInfo,
  branding,
  brandingImage,
  socialIcons,
  container,
  footerContact,
  footerBottom,
  footerHeading,
  contactInfo,
  footerCta,
  footerCopyright,
  footerCopyrightLinks,
} from './footer.module.css';

const Footer = () => {
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <StaticQuery
      query={graphql`
        {
          logo: file(relativePath: { eq: "icon-logo.png" }) {
            childImageSharp {
              gatsbyImageData(width: 400, quality: 100, placeholder: NONE, layout: CONSTRAINED)
            }
          }
          facebookIcon: file(relativePath: { eq: "icon-social-facebook.png" }) {
            childImageSharp {
              gatsbyImageData(width: 24, placeholder: NONE, layout: FIXED)
            }
          }
          instagramIcon: file(relativePath: { eq: "icon-social-instagram.png" }) {
            childImageSharp {
              gatsbyImageData(width: 24, placeholder: NONE, layout: FIXED)
            }
          }
          twitterIcon: file(relativePath: { eq: "icon-social-twitter.png" }) {
            childImageSharp {
              gatsbyImageData(width: 24, placeholder: NONE, layout: FIXED)
            }
          }
          youtubeIcon: file(relativePath: { eq: "icon-social-youtube.png" }) {
            childImageSharp {
              gatsbyImageData(width: 24, placeholder: NONE, layout: FIXED)
            }
          }
          pinterestIcon: file(relativePath: { eq: "icon-social-pinterest.png" }) {
            childImageSharp {
              gatsbyImageData(width: 24, placeholder: NONE, layout: FIXED)
            }
          }
          footerLegalLinks: sanityMenu(slug: { current: { eq: "footer-legal-links" } }) {
            title
            links {
              _key
              title
              href
              hidden
            }
          }
          footerLinks: sanityMenu(slug: { current: { eq: "footer-links" } }) {
            title
            links {
              _key
              title
              href
              hidden
              embeddedMenu {
                ...EmbeddedMenu
              }
            }
          }
          contactInfoSection: sanityGlobalSection(slug: { current: { eq: "footer-contact-info" } }) {
            ...GlobalSection
          }
        }
      `}
      render={({
        contactInfoSection,
        logo,
        facebookIcon,
        twitterIcon,
        youtubeIcon,
        instagramIcon,
        pinterestIcon,
        footerLinks: { links: footerLinksArray },
        footerLegalLinks: { links: footerLegalLinksArray },
      }) => {
        // split into 4 groups
        // console.log('contactInfoSection: ', contactInfoSection);
        return (
          <div className={root}>
            <div className={container}>
              <div className={wrapper}>
                <div className={branding}>
                  <Link to="/">
                    <GatsbyImage
                      image={logo.childImageSharp.gatsbyImageData}
                      className={brandingImage}
                      alt="Academy of Art University"
                    />
                  </Link>
                </div>
                <div className={socialIcons}>
                  {generateSocialLinks(
                    [
                      'https://www.facebook.com/AcademyofArtUniversity',
                      'https://twitter.com/academy_of_art',
                      'http://www.youtube.com/user/academyofartu',
                      'https://www.instagram.com/academy_of_art',
                      'https://www.pinterest.com/academyofartuni',
                    ],
                    {
                      facebook: facebookIcon,
                      twitter: twitterIcon,
                      youtube: youtubeIcon,
                      instagram: instagramIcon,
                      pinterest: pinterestIcon,
                    }
                  )}
                </div>
              </div>
              <div className={footerBottom}>
                <div className={footerContact}>
                  <div className={footerHeading}>Get in touch</div>
                  <div className={addressInfo}>
                    <div>
                      <a type="tel" href="tel:1-800-544-2787">
                        1-800-544-2787
                      </a>
                    </div>
                    <address>
                      <div>79 New Montgomery St.</div>
                      <div>San Francisco, CA 94105</div>
                    </address>
                    <div>
                      <a
                        className={footerCta}
                        target="_blank"
                        rel="noopener"
                        href="https://www.google.com/maps/dir//Academy+of+Art+94105"
                      >
                        Get Directions
                      </a>
                    </div>
                  </div>
                </div>
                {footerLinksArray.map(({ _key, title, embeddedMenu }) => (
                  <div className={footerContact} key={_key}>
                    <div className={footerHeading}>{title}</div>
                    <div className={contactInfo}>
                      {embeddedMenu[0].links.map(({ _key, title, href, hidden }) => (
                        <MenuLink key={_key} title={title} href={href} hidden={hidden} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className={footerCopyright}>
                <div>© {new Date().getFullYear()} Academy of Art University&nbsp;</div>
                <ul className={footerCopyrightLinks}>
                  {footerLegalLinksArray.map(({ _key, title, href, hidden }) => (
                    <li key={_key}>
                      <MenuLink title={title} href={href} hidden={hidden} />
                    </li>
                  ))}
                </ul>
                <div className={socialIcons}>
                  {generateSocialLinks(
                    [
                      'https://www.facebook.com/AcademyofArtUniversity',
                      'https://twitter.com/academy_of_art',
                      'http://www.youtube.com/user/academyofartu',
                      'https://www.instagram.com/academy_of_art',
                      'https://www.pinterest.com/academyofartuni',
                    ],
                    {
                      facebook: facebookIcon,
                      twitter: twitterIcon,
                      youtube: youtubeIcon,
                      instagram: instagramIcon,
                      pinterest: pinterestIcon,
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default Footer;
