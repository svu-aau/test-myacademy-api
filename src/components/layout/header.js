import { graphql, Link, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { cn } from '../../lib/helpers';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import styles from './header.module.css';
import MenuLink from './menu-link';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

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
    backgroundColor: 'transparent',
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
  },
  appBarBackground: {
    backgroundColor: 'var(--color-dark-black-bg)',
    transition: 'background-color 200ms linear',
  },
  drawer: {
    '& > div': {
      border: 'none',
    },
    backgroundColor: 'var(--color-dark-black-bg)',
  },
  drawerInner: {
    backgroundColor: 'var(--color-dark-black-bg)',
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
          mainMenu: sanityMenu(slug: { current: { eq: "main-menu" } }) {
            title
            links {
              _key
              title
              href
              hidden
            }
          }
          about: sanityMenu(slug: { current: { eq: "about" } }) {
            title
            links {
              _key
              title
              href
              hidden
            }
          }
          galleries: sanityMenu(slug: { current: { eq: "galleries" } }) {
            title
            links {
              _key
              title
              href
              hidden
            }
          }
          pastShows: sanityMenu(slug: { current: { eq: "past-shows" } }) {
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
        logo,
        schools,
        about: { links: aboutLinks },
        galleries: { links: galleryLinks },
        mainMenu: { links: mainMenuLinks },
        pastShows: { links: pastShowLinks },
      }) => {
        const displaySchools = schools.nodes.sort((a, b) => a.title.localeCompare(b.title));
        // split past show links into two columns (but hide the hidden ones first)
        const pastShowLinks2 = [...pastShowLinks.filter(({ hidden }) => hidden !== true)];
        const pastShowLinks1 = pastShowLinks2.splice(0, Math.ceil(pastShowLinks2.length / 2));

        return (
          <div className={styles.root}>
            <div className="st-search-container" />
            <ClickAwayListener onClickAway={() => (drawerOpen ? setDrawerOpen(!drawerOpen) : null)}>
              <div>
                <AppBar className={cn(classes.appBar, (fixedNav || trigger || drawerOpen) && classes.appBarBackground)}>
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
                    <form className={styles.searchWrapper}>
                      <IconButton
                        color="inherit"
                        style={{ display: searchBarVisible ? 'none' : 'block' }}
                        aria-label="search"
                        onClick={toggleEditing}
                      >
                        <SearchIcon style={{ fontSize: 35 }} />
                      </IconButton>
                      <IconButton
                        color="inherit"
                        aria-label="search"
                        style={{ display: searchBarVisible ? 'block' : 'none' }}
                        onClick={toggleEditing}
                      >
                        <CancelIcon style={{ fontSize: 35 }} />
                      </IconButton>
                      <div className={cn(styles.searchBar, searchBarVisible && styles.searchBarVisible)}>
                        <input type="text" onKeyDown={escFunction} ref={inputRef} className="st-default-search-input" />
                      </div>
                    </form>
                    <IconButton color="inherit" aria-label="menu" onClick={() => setDrawerOpen(!drawerOpen)}>
                      <div className={cn(styles.navBurgerIcon, drawerOpen && styles.navBurgerIconOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </IconButton>
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

                        <div className={cn(styles.headerMenuSchools, styles.flexCenter)}>
                          <div>
                            <div className={styles.headerMenuTitle}>Galleries</div>
                            <ul>
                              {galleryLinks &&
                                galleryLinks.map(({ _key, title, href, hidden }) => (
                                  <li className={styles.columnLink} key={_key}>
                                    <Link to={href} onClick={() => setDrawerOpen(false)}>
                                      {title}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className={cn(styles.headerMenuContent, styles.justifyNormal)}>
                        <div className={cn(styles.headerMenuSchools, styles.noFlex, styles.marginRight)}>
                          <div className={styles.headerMenuColumn}>
                            <div className={styles.headerMenuTitle}>About</div>
                            <ul>
                              {aboutLinks &&
                                aboutLinks.map(({ _key, title, href, hidden }) => (
                                  <li className={styles.columnLink} key={_key}>
                                    <Link to={href} onClick={() => setDrawerOpen(false)}>
                                      {title}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                        <div
                          className={cn(
                            styles.headerMenuSchools,
                            styles.noFlex,
                            styles.justifyNormal,
                            styles.flexColumn
                          )}
                        >
                          <div className={cn(styles.headerMenuTitle, styles.pastShowsMenuTitle)}>Past Spring Shows</div>
                          <div className={styles.pastShowsMenus}>
                            <ul>
                              {pastShowLinks1 &&
                                pastShowLinks1.map(({ _key, title, href, hidden }) => (
                                  <li key={_key}>
                                    <MenuLink href={href} title={title} hidden={hidden} />
                                  </li>
                                ))}
                            </ul>
                            <ul>
                              {pastShowLinks2 &&
                                pastShowLinks2.map(({ _key, title, href, hidden }) => (
                                  <li key={_key}>
                                    <MenuLink href={href} title={title} hidden={hidden} />
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
