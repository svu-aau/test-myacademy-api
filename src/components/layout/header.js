import React, { useState, useEffect, useRef } from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Button } from '@aauweb/design-library';

import { cn } from '../../lib/helpers';
import {
  root,
  brandingImage,
  branding,
  srOnly,
  contactContent,
  navBurgerIcon,
  navBurgerIconOpen,
  bottomBar,
  headerMenu,
  searchBarMobile,
  headerMenuContent,
  headerMenuTitle,
  headerMenuSchools,
  flexThree,
  flexFour,
  headerMenuColumns,
  headerMenuColumnNoTitle,
  mainImage,
  smallMainImage,
  hero,
  heroTitle,
  title,
  hamburger,
  toolbar as toolbarCss,
} from './header.module.css';

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
      boxShadow: 'inset 0 0px 0 0px #ee3224',
      transition: 'box-shadow .15s ease-in-out',
      '&.light-hover:hover': {
        backgroundColor: 'unset',
        boxShadow: 'inset 0 -40px 0 -1px #ee3224',
      },
      '&.dark-hover:hover': {
        boxShadow: 'inset 0 -40px 0 -1px #ce1c0d',
      },
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [curPath, setCurPath] = useState();
  const [isHoverSchools, setIsHoverSchools] = useState(false);
  const toggleEditing = () => {
    setEditing(!isEditing);
    setSearchBarVisible(!isEditing);
  };
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  useEffect(() => {
    setCurPath(window.location.pathname);
  });
  const inputRef = useRef(null);
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
        {
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
              gatsbyImageData(width: 400, quality: 100, placeholder: NONE, layout: CONSTRAINED)
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
          <div className={root}>
            <div className="st-search-container" />
            <ClickAwayListener onClickAway={() => (drawerOpen ? setDrawerOpen(!drawerOpen) : null)}>
              <div>
                <AppBar className={classes.appBar}>
                  <Toolbar className={toolbarCss} disableGutters>
                    <div className={branding}>
                      <GatsbyImage
                        image={logo.childImageSharp.gatsbyImageData}
                        className={brandingImage}
                        loading="eager"
                        alt="Academy of Art University"
                      />
                      <Link to="/">
                        <span className={srOnly}>Go to home page</span>
                      </Link>
                    </div>
                    <div className={contactContent}>
                      <p>
                        <a href="tel:+18005442787" target="_blank" className={classes.contactLink}>
                          1-800-544-2787
                        </a>
                        <span> / </span>
                        <Link to="/contact-us" className={classes.contactLink}>
                          Contact
                        </Link>
                      </p>
                    </div>
                    <IconButton
                      className={hamburger}
                      color="inherit"
                      aria-label="menu"
                      onClick={() => setDrawerOpen(!drawerOpen)}
                    >
                      <div className={cn(navBurgerIcon, drawerOpen && navBurgerIconOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </IconButton>
                  </Toolbar>
                  <Toolbar className={bottomBar} disableGutters>
                    <div className={classes.left}>
                      {linksArray.map(({ _key, title, href, hidden }) => {
                        const updatedHref = href?.slice(-1) === '/' ? href.slice(0, -1) : href;
                        const updatedCurPath = curPath?.slice(-1) === '/' ? curPath.slice(0, -1) : curPath;
                        return (
                          <Link
                            key={_key}
                            className={updatedHref === updatedCurPath ? 'active' : ''}
                            to={href}
                            onMouseEnter={() => title === 'Schools' && setIsHoverSchools(true)}
                          >
                            <span>{title}</span>
                          </Link>
                        );
                      })}
                    </div>
                    <div className={classes.right}>
                      <Button className="dark-hover" variant="contained" color="primary" label="Request Info" />
                      <Button className="light-hover" variant="outlined" color="primary" label="Apply" />
                    </div>
                  </Toolbar>

                  {isHoverSchools && (
                    <div className={cn(headerMenuSchools, flexFour)} onMouseLeave={() => setIsHoverSchools(false)}>
                      <div className={headerMenuColumns}>
                        <ul>
                          {displaySchools &&
                            displaySchools.slice(0, 7).map((school) => (
                              <li key={school.id}>
                                <Link to={`/schools/${school.slug.current}`} onClick={() => setIsHoverSchools(false)}>
                                  {school.title}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div className={cn(headerMenuColumns)}>
                        <ul>
                          {displaySchools &&
                            displaySchools.slice(7, 14).map((school) => (
                              <li key={school.id}>
                                <Link to={`/schools/${school.slug.current}`} onClick={() => setIsHoverSchools(false)}>
                                  {school.title}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div className={cn(headerMenuColumns)}>
                        <ul>
                          {displaySchools &&
                            displaySchools.slice(14, 21).map((school) => (
                              <li key={school.id}>
                                <Link to={`/schools/${school.slug.current}`} onClick={() => setIsHoverSchools(false)}>
                                  {school.title}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div className={cn(headerMenuColumns)}>
                        <ul>
                          {displaySchools &&
                            displaySchools.slice(21).map((school) => (
                              <li key={school.id}>
                                <Link to={`/schools/${school.slug.current}`} onClick={() => setIsHoverSchools(false)}>
                                  {school.title}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </AppBar>
                {/* leave this SHIM to push down content when fixedNav at top */}
                {fixedNav && <Toolbar />}
                <Drawer classes={{ root: classes.drawer }} variant={'persistent'} anchor="top" open={drawerOpen}>
                  <div className={classes.drawerInner}>
                    <nav className={headerMenu}>
                      <div className={cn(searchBarMobile)}>
                        <input type="text" onKeyDown={escFunction} ref={inputRef} className="st-default-search-input" />
                      </div>
                      <div className={headerMenuContent}>
                        {linksArray.map(({ _key, title, href, hidden }) => (
                          <a href={href} key={_key}>
                            <div className={headerMenuTitle}>{title}</div>
                          </a>
                        ))}

                        <div className={cn(headerMenuSchools, flexThree)}>
                          <div className={headerMenuTitle}>Schools</div>
                          <div className={headerMenuColumns}>
                            <ul>
                              {displaySchools &&
                                displaySchools.slice(0, 7).map((school) => (
                                  <li key={school.id}>
                                    <Link to={`/schools/${school.slug.current}`} onClick={() => setDrawerOpen(false)}>
                                      {school.title}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className={cn(headerMenuColumns, headerMenuColumnNoTitle)}>
                            <ul>
                              {displaySchools &&
                                displaySchools.slice(7, 14).map((school) => (
                                  <li key={school.id}>
                                    <Link to={`/schools/${school.slug.current}`} onClick={() => setDrawerOpen(false)}>
                                      {school.title}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className={cn(headerMenuColumns, headerMenuColumnNoTitle)}>
                            <ul>
                              {displaySchools &&
                                displaySchools.slice(14).map((school) => (
                                  <li key={school.id}>
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
              <div className={cn(mainImage, smallHeader && smallMainImage)}>
                <GatsbyImage
                  image={backgroundImage.childImageSharp.gatsbyImageData}
                  className={hero}
                  loading="eager"
                  alt="Academy of Art University"
                />
                {siteTitle && <h3 className={heroTitle}>{siteTitle}</h3>}
                {siteSubtitle && <h1 className={title}>{siteSubtitle}</h1>}
                {heroImageCaption && <figcaption className={heroImageCaption}>{heroImageCaption}</figcaption>}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default Header;
