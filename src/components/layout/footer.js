import { graphql, Link, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { generateSocialLinks } from '../../utils/tools';
import MenuLink from './menu-link';

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
          appStoreButton: file(relativePath: { eq: "icon-social-download-app.png" }) {
            childImageSharp {
              fixed(width: 72) {
                ...GatsbyImageSharpFixed_noBase64
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
          tikTokIcon: file(relativePath: { eq: "icon-social-tiktok.png" }) {
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
          spotifyIcon: file(relativePath: { eq: "icon-social-spotify.png" }) {
            childImageSharp {
              fixed(width: 24) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
          schools: allSanitySchool {
            nodes {
              ...School
            }
          }
          footer: sanityMenu(slug: { current: { eq: "footer-links" } }) {
            title
            links {
              _key
              title
              href
              hidden
            }
          }
        }
      `}
      render={({
        schools,
        logo,
        appStoreButton,
        facebookIcon,
        twitterIcon,
        youtubeIcon,
        instagramIcon,
        spotifyIcon,
        tikTokIcon,
        footer: { links: footerLinks },
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
                      'https://open.spotify.com/show/2z1VI3JJJy4SCUSuMi6D3o?si=2mnl3fmSRAisKEvmBdgQfQ',
                      'https://www.tiktok.com/@academyofartuniversity',
                    ],
                    {
                      facebook: facebookIcon,
                      twitter: twitterIcon,
                      youtube: youtubeIcon,
                      instagram: instagramIcon,
                      spotify: spotifyIcon,
                      tiktok: tikTokIcon,
                    }
                  )}
                </div>
              </div>
              <div className={styles.footerBottom}>
                <div className={styles.footerContact}>
                  <div className={styles.footerHeading}>About</div>
                  <div className={styles.contactInfo}>
                    <div>
                      The Graduate School is here to support our students in any way we can. If you have any questions,
                      issues, or suggestions please do not hesitate to contact us. The Graduate Schhol offices are open
                      from 9:00am to 6:00pm (Pacific time) Monday through Friday. If you reach us after office hours we
                      will respond as quickly as possible.
                    </div>
                  </div>
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
                    <a type="tel" href="#">
                      Contact
                    </a>
                    <a type="tel" href="#">
                      Site Map
                    </a>
                    <a type="tel" href="#">
                      My Academy
                    </a>
                    <a type="tel" href="#">
                      Industry & Recruiters
                    </a>
                    <a type="tel" href="#">
                      Job Seekers
                    </a>
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
                  {footerLinks.map(({ _key, title, href, hidden }) => (
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
                      'http://www.spotify.com/academyofartuni',
                      'http://tiktok.com/academyofartu',
                    ],
                    {
                      facebook: facebookIcon,
                      twitter: twitterIcon,
                      youtube: youtubeIcon,
                      instagram: instagramIcon,
                      spotify: spotifyIcon,
                      tiktok: tikTokIcon,
                    }
                  )}
                  <a target="_blank" href="http://apple.co/1I6ySIP">
                    <Img fixed={appStoreButton.childImageSharp.fixed} alt="Academy of Art on Apple App Store" />
                  </a>
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
