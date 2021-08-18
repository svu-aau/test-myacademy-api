import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Button } from '@aauweb/design-library';

import { cn } from '../../lib/helpers';
import styles from './header.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
    backgroundColor: 'var(--color-dark-black-bg) !important',
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
  },
  left: {
    display: 'flex',
    flex: 1,
    '& > a': {
      display: 'inline-block',
      fontSize: '14px',
      padding: '1rem',
      paddingBottom: 0,
      marginLeft: '-0.3125rem',
      fontWeight: 500,
      cursor: 'pointer',
      color: '#292931',
      height: '100%',
      textDecoration: 'none',
    },
    '& span': {
      borderBottom: '3px solid transparent',
      paddingBottom: '1rem',
      display: 'block',
      height: 'calc( 100% + 1px)',
    },
    '& > a:hover span': {
      borderColor: '#ee3224',
    },
    '& > a.active span': {
      borderColor: '#ee3224',
    },
  },
  right: {
    '& > button': {
      marginLeft: '0.25em',
      minWidth: 120,
    },
  },
  contactLink: {
    color: 'white',
  },
  drawer: {
    '& > div': {
      border: 'none',
    },
    backgroundColor: 'var(--color-dark-black-bg)',
  },
  drawerInner: {
    backgroundColor: 'var(--color-white)',
    color: 'var(--color-dark-black-bg)',
    '& a': {
      color: 'var(--color-dark-black-bg)',
    },
  },
}));

const Header = ({
  fixedNav = false,
  smallHeader = false,
  siteTitle,
  siteSubtitle,
  heroImageCaption,
  backgroundImage,
}) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [searchBarVisible, setSearchBarVisible] = React.useState(false);
  const [isEditing, setEditing] = React.useState(false);
  const toggleEditing = () => {
    setEditing(!isEditing);
    setSearchBarVisible(!isEditing);
  };
  React.useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  const inputRef = React.useRef(null);
  const classes = useStyles();
  const escFunction = (event) => {
    if (isEditing && event.keyCode === 27) {
      toggleEditing();
    }
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 300,
  });
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <StaticQuery
      query={graphql`
        query {
          mainMenu: sanityMenu(slug: { current: { eq: "main-menu" } }) {
            title
            links {
              _key
              title
              href
              hidden
            }
          }
          logo: file(relativePath: { eq: "icon-logo.png" }) {
            childImageSharp {
              fluid(maxWidth: 400, quality: 100) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          schools: allSanitySchool {
            nodes {
              ...School
            }
          }
        }
      `}
      render={({ mainMenu: { links: linksArray }, logo, schools }) => {
        const displaySchools = schools.nodes.sort((a, b) => a.title.localeCompare(b.title));

        return (
          <div className={styles.root}>
            <div className="st-search-container" />
            <ClickAwayListener onClickAway={() => (drawerOpen ? setDrawerOpen(!drawerOpen) : null)}>
              <div>
                <AppBar className={classes.appBar}>
                  <Toolbar className={styles.toolbar} disableGutters>
                    <div className={styles.branding}>
                      <Img
                        className={styles.brandingImage}
                        loading="eager"
                        fluid={logo.childImageSharp.fluid}
                        alt="Academy of Art University"
                      />
                      <Link to="/">
                        <span className={styles.srOnly}>Go to home page</span>
                      </Link>
                    </div>
                    <div className={styles.contactContent}>
                      <p>
                        <a href="tel:+18005442787" target="_blank" className={classes.contactLink}>
                          1-800-544-2787
                          <span> / </span>
                          Contact
                        </a>
                      </p>
                    </div>
                    <IconButton
                      className={styles.hamburger}
                      color="inherit"
                      aria-label="menu"
                      onClick={() => setDrawerOpen(!drawerOpen)}
                    >
                      <div className={cn(styles.navBurgerIcon, drawerOpen && styles.navBurgerIconOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </IconButton>
                  </Toolbar>
                  <Toolbar className={styles.bottomBar} disableGutters>
                    <div className={classes.left}>
                      {linksArray.map(({ _key, title, href, hidden }) => (
                        <Link activeClassName="active" to={href} key={_key}>
                          <span>{title}</span>
                        </Link>
                      ))}
                    </div>
                    <div className={classes.right}>
                      <Button variant="contained" color="primary" label="Request Info" />
                      <Button variant="outlined" color="primary" label="Apply" />
                    </div>
                  </Toolbar>
                </AppBar>
                {/* leave this SHIM to push down content when fixedNav at top */}
                {fixedNav && <Toolbar />}
                <Drawer classes={{ root: classes.drawer }} variant={'persistent'} anchor="top" open={drawerOpen}>
                  <div className={classes.drawerInner}>
                    <nav className={styles.headerMenu}>
                      <div className={cn(styles.searchBarMobile)}>
                        <input type="text" onKeyDown={escFunction} ref={inputRef} className="st-default-search-input" />
                      </div>
                      <div className={styles.headerMenuContent}>
                        {linksArray.map(({ _key, title, href, hidden }) => (
                          <a href={href} key={_key}>
                            <div className={styles.headerMenuTitle}>{title}</div>
                          </a>
                        ))}

                        <div className={cn(styles.headerMenuSchools, styles.flexThree)}>
                          <div className={styles.headerMenuColumn}>
                            <div className={styles.headerMenuTitle}>Schools</div>
                            <ul>
                              {displaySchools &&
                                displaySchools.slice(0, 7).map((school) => (
                                  <li className={styles.columnLink} key={school.id}>
                                    <Link to={`/schools/${school.slug.current}`} onClick={() => setDrawerOpen(false)}>
                                      {school.title}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className={cn(styles.headerMenuColumn, styles.headerMenuColumnNoTitle)}>
                            <ul>
                              {displaySchools &&
                                displaySchools.slice(7, 14).map((school) => (
                                  <li className={styles.columnLink} key={school.id}>
                                    <Link to={`/schools/${school.slug.current}`} onClick={() => setDrawerOpen(false)}>
                                      {school.title}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className={cn(styles.headerMenuColumn, styles.headerMenuColumnNoTitle)}>
                            <ul>
                              {displaySchools &&
                                displaySchools.slice(14).map((school) => (
                                  <li className={styles.columnLink} key={school.id}>
                                    <Link to={`/schools/${school.slug.current}`} onClick={() => setDrawerOpen(false)}>
                                      {school.title}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </nav>
                  </div>
                </Drawer>
              </div>
            </ClickAwayListener>
            {backgroundImage && (
              <div className={cn(styles.mainImage, smallHeader && styles.smallMainImage)}>
                <Img
                  className={styles.hero}
                  loading="eager"
                  fluid={backgroundImage.childImageSharp.fluid}
                  alt="Academy of Art University"
                />
                {siteTitle && <h3 className={styles.heroTitle}>{siteTitle}</h3>}
                {siteSubtitle && <h1 className={styles.title}>{siteSubtitle}</h1>}
                {heroImageCaption && <figcaption className={styles.heroImageCaption}>{heroImageCaption}</figcaption>}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default Header;
