import { graphql, Link, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { generateSocialLinks } from '../../utils/tools';
import MenuLink from './menu-link';

import ContentSections from '../pagebuilder/content-sections';

import styles from './footer.module.css';

const Footer = () => {
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <StaticQuery
      query={graphql`
        query {
          logo: file(relativePath: { eq: "icon-logo.png" }) {
            childImageSharp {
              fluid(maxWidth: 400, quality: 100) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          facebookIcon: file(relativePath: { eq: "icon-social-facebook.png" }) {
            childImageSharp {
              fixed(width: 24) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
          instagramIcon: file(relativePath: { eq: "icon-social-instagram.png" }) {
            childImageSharp {
              fixed(width: 24) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
          twitterIcon: file(relativePath: { eq: "icon-social-twitter.png" }) {
            childImageSharp {
              fixed(width: 24) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
          youtubeIcon: file(relativePath: { eq: "icon-social-youtube.png" }) {
            childImageSharp {
              fixed(width: 24) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
          pinterestIcon: file(relativePath: { eq: "icon-social-pinterest.png" }) {
            childImageSharp {
              fixed(width: 24) {
                ...GatsbyImageSharpFixed_noBase64
              }
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
        return (
          <div className={styles.root}>
            <div className={styles.container}>
              <div className={styles.wrapper}>
                <div className={styles.branding}>
                  <Link to="/">
                    <Img
                      className={styles.brandingImage}
                      fluid={logo.childImageSharp.fluid}
                      alt="Academy of Art University"
                    />
                  </Link>
                </div>
                <div className={styles.socialIcons}>
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
              <div className={styles.footerBottom}>
                <div className={styles.footerContact}>
                  <div className={styles.footerHeading}>About</div>
                  {contactInfoSection && (
                    <div className={styles.contactInfo}>
                      <ContentSections
                        textOnly
                        content={contactInfoSection.content}
                        slug={contactInfoSection.slug.current}
                      />
                    </div>
                  )}
                </div>
                <div className={styles.footerContact}>
                  <div className={styles.footerHeading}>Get in touch</div>
                  <div className={styles.addressInfo}>
                    <div>
                      <a type="tel" href="tel:1-800-544-2787">
                        1-800-544-2787
                      </a>
                      <span> or </span>
                      <a type="tel" href="tel:1-415-274-8617">
                        415-274-8617
                      </a>
                    </div>
                    <br />
                    <address>
                      <div>79 New Montgomery St.</div>
                      <div>San Francisco, CA 94105</div>
                    </address>
                    <div>
                      <a
                        className={styles.footerCta}
                        target="_blank"
                        rel="noopener"
                        href="https://www.google.com/maps/dir//Academy+of+Art+94105"
                      >
                        Get Directions
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.footerContact}>
                  <div className={styles.footerHeading}>Links & Resources</div>
                  <div className={styles.contactInfo}>
                    {footerLinksArray.map(({ _key, title, href, hidden }) => (
                      <a href={href} key={_key}>
                        {title}
                      </a>
                    ))}
                  </div>

                  {/*
                  <ul className={styles.footerColumns}>
                    {schools.nodes &&
                      schools.nodes
                        .sort((a, b) => a.title.localeCompare(b.title))
                        .map((node) => (
                          <li className={styles.columnLink} key={node.id}>
                            <Link to={`/schools/${node.slug.current}`}>{node.title}</Link>
                          </li>
                        ))}
                  </ul>
                  */}
                </div>
              </div>
              <div className={styles.footerCopyright}>
                <div>© {new Date().getFullYear()} Academy of Art University&nbsp;</div>
                <ul className={styles.footerCopyrightLinks}>
                  {footerLegalLinksArray.map(({ _key, title, href, hidden }) => (
                    <li key={_key}>
                      <MenuLink title={title} href={href} hidden={hidden} />
                    </li>
                  ))}
                </ul>
                <div className={styles.socialIcons}>
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
