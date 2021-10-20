import React, { useState, useEffect, useRef } from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import clsx from 'clsx';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { cn } from '../../lib/helpers';
import {
  root,
  branding,
  srOnly,
  contactContent,
  navBurgerIcon,
  navBurgerIconOpen,
  bottomBar,
  headerMenu,
  headerMenuContent,
  headerMenuTitle,
  headerMenuSchools,
  flexFour,
  headerMenuColumns,
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
      textDecoration: 'none !important',
    },
    '& span': {
      borderBottom: '3px solid transparent',
      paddingBottom: '1rem',
      display: 'block',
      height: 'calc( 100% + 1px)',
    },
    '& > a:hover': {
      color: '#ee3224',
    },
    '& > a:hover span': {
      borderColor: '#ee3224',
    },
    '& > a:hover+.mega-content': {
      display: 'block',
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
    marginTop: 64,
    '& a': {
      color: 'var(--color-dark-black-bg)',
      fontWeight: 'bold',
      display: 'block',
    },
    '& a:hover': {
      textDecoration: 'none',
    },
  },
  hamburgerButton: {
    paddingRight: 0,
  },
  headerMenuList: {
    margin: 0,
    padding: 0,
  },
  headerMenuNavItem: {
    borderBottom: '1px solid #dddddd',
    padding: '1em 1.25em',
    '&:last-of-type': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: '#f2f5f9',
    },
  },
  megaMenuContent: {
    color: '#292931',
    padding: '2rem 2rem 1rem',
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    left: 0,
    top: '3.25rem',
    borderBottom: '1px solid #f8f8f8',
    display: 'none',
    '&:hover': {
      display: 'block',
    },
    '& ul a': {
      color: '#292931',
      fontSize: '14px',
      lineHeight: '1rem',
      display: 'block',
      paddingBottom: '.5rem',
    },
    '& ul': {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    },
  },
  subMenuTitle: {
    fontWeight: 700,
    pointerEvents: 'none',
    paddingBottom: '.5rem',
    textTransform: 'uppercase',
  },
  subMenu: {
    textTransform: 'initial',
    paddingRight: '2rem',
    '& li a': {
      paddingBottom: 0,
      fontWeight: 400,
    },
    '& span': {
      paddingBottom: '.5rem',
    },
  },
  menuTitle: {},
  // 2 and 20
  hamburgerMenuButton: {
    position: 'relative',
    width: 20,
    height: 20,

    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      backgroundColor: '#000000',
      transition: 'transform 0.25s ease-out',
    },

    /* Vertical line */
    '&:before': {
      top: 0,
      left: '50%',
      width: 2,
      height: '100%',
      marginLeft: -1,
    },

    /* horizontal line */
    '&:after': {
      top: '50%',
      left: 0,
      width: '100%',
      height: 2,
      marginTop: -1,
    },

    '&:hover': {
      cursor: 'pointer',

      '&:before': {
        transform: 'rotate(90deg)',
      },
      '&:after': {
        transform: 'rotate(180deg)',
      },
    },
  },
  headerMenuActive: {
    background: '#32323c',
    '& a': {
      color: '#FFFFFF',
    },
    '& .hamburgerButton:before, & .hamburgerButton:after': {
      backgroundColor: '#FFFFFF',
    },
    '& .hamburgerButton:before': {
      transform: 'rotate(90deg)',
    },
    '& .hamburgerButton:after': {
      transform: 'rotate(180deg)',
    },

    '&:hover': {
      background: '#292931',
    },
  },
  subMenuWrap: {
    backgroundColor: '#f2f5f9',
  },
  subMenuWrapActive: {
    '& .hamburgerButton:before': {
      transform: 'rotate(90deg)',
    },
    '& .hamburgerButton:after': {
      transform: 'rotate(180deg)',
    },
  },
}));

const Header = ({ smallHeader = false, siteTitle, siteSubtitle, heroImageCaption, backgroundImage }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [curPath, setCurPath] = useState();
  const [isHoverSchools, setIsHoverSchools] = useState(false);
  const [open, setOpen] = React.useState([]);
  const handleClick = (idx, idx2) => {
    if (idx2 > 0) {
      if (open[1] === idx2) {
        setOpen([idx, 0]);
      } else {
        setOpen([idx, idx2]);
      }
    } else {
      if (open[0] === idx) {
        setOpen([0, 0]);
      } else {
        setOpen([idx, 0]);
      }
    }
  };
  const classes = useStyles();

  const toggleDrawer = () => {
    if (drawerOpen) {
      setOpen([0, 0]);
      setDrawerOpen(false);
    } else {
      setDrawerOpen(true);
    }
  };

  useEffect(() => {
    setCurPath(window.location.pathname);
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
              embeddedMenu {
                ...EmbeddedMenu
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
      render={({ mainMenu: { links: linksArray }, schools }) => {
        const displaySchools = schools.nodes.sort((a, b) => a.title.localeCompare(b.title));

        return (
          <div className={root}>
            <ClickAwayListener onClickAway={() => (drawerOpen ? toggleDrawer() : null)}>
              <div>
                <AppBar className={classes.appBar}>
                  <Toolbar className={toolbarCss} disableGutters>
                    <div className={branding}>
                      <StaticImage
                        src="../../images/icon-logo.png"
                        loading="eager"
                        alt="Academy of Art University"
                        placeholder="none"
                        style={{ maxWidth: '400px' }}
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
                      className={cn(classes.hamburgerButton, hamburger)}
                      color="inherit"
                      aria-label="menu"
                      onClick={toggleDrawer}
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
                      {linksArray.map(({ _key, title, href, hidden, embeddedMenu, ...rest }) => {
                        const updatedHref = href?.slice(-1) === '/' ? href.slice(0, -1) : href;
                        const updatedCurPath = curPath?.slice(-1) === '/' ? curPath.slice(0, -1) : curPath;
                        return (
                          <>
                            <Link
                              key={_key}
                              className={updatedHref === updatedCurPath ? 'active' : ''}
                              to={href}
                              onMouseEnter={() => setIsHoverSchools(title === 'Schools')}
                            >
                              <span>{title}</span>
                            </Link>
                            {embeddedMenu.length > 0 && (
                              <div className={`${classes.megaMenuContent} mega-content`}>
                                <div>
                                  {embeddedMenu.map((menuContent) => (
                                    <ul key={menuContent.title}>
                                      <a className={classes.subMenuTitle}>{menuContent.title}</a>
                                      <ul className={classes.subMenu}>
                                        {menuContent.links.map((menuLink) => (
                                          <li key={menuLink._key} className={classes.menuItem}>
                                            <Link to={menuLink.href}>
                                              <span>{menuLink.title}</span>
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </ul>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}
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
                <Drawer classes={{ root: classes.drawer }} variant={'persistent'} anchor="top" open={drawerOpen}>
                  <div className={classes.drawerInner}>
                    <nav className={headerMenu}>
                      <div className={headerMenuContent}>
                        <List
                          component="nav"
                          aria-labelledby="nested-list-subheader"
                          className={classes.headerMenuList}
                          disablePadding
                        >
                          {linksArray.map(({ _key, title, href, embeddedMenu }, idx) => {
                            const categoryIdx = idx + 1;
                            const categoryOpen = open[0] === categoryIdx;
                            return (
                              <>
                                <ListItem
                                  button
                                  key={_key}
                                  className={`${classes.headerMenuNavItem} ${categoryOpen && classes.headerMenuActive}`}
                                  onClick={() => handleClick(categoryIdx, 0)}
                                >
                                  <div className={headerMenuTitle}>
                                    <Link to={href} onClick={toggleDrawer} className={headerMenuTitle}>
                                      {title}
                                    </Link>
                                    {embeddedMenu.length > 0 && (
                                      <ListItemSecondaryAction>
                                        <div className={clsx(classes.hamburgerMenuButton, 'hamburgerButton')} />
                                      </ListItemSecondaryAction>
                                    )}
                                  </div>
                                </ListItem>
                                {categoryOpen &&
                                  embeddedMenu.map((embeddedLink, idx2) => {
                                    const itemIdx = idx2 + 1;
                                    const itemOpen = open[1] === itemIdx;

                                    return (
                                      <>
                                        <ListItem
                                          button
                                          key={embeddedLink._key}
                                          className={clsx(
                                            classes.headerMenuNavItem,
                                            classes.subMenuWrap,
                                            itemOpen && classes.subMenuWrapActive
                                          )}
                                          onClick={() => handleClick(categoryIdx, itemIdx)}
                                        >
                                          <div className={headerMenuTitle}>
                                            <Link
                                              to={embeddedLink.href}
                                              onClick={toggleDrawer}
                                              className={headerMenuTitle}
                                            >
                                              {embeddedLink.title}
                                            </Link>
                                            <ListItemSecondaryAction>
                                              <div className={clsx(classes.hamburgerMenuButton, 'hamburgerButton')} />
                                            </ListItemSecondaryAction>
                                          </div>
                                        </ListItem>
                                        {itemOpen &&
                                          embeddedLink.links.map((embeddedLinkLink) => (
                                            <ListItem
                                              button
                                              key={embeddedLinkLink._key}
                                              className={classes.headerMenuNavItem}
                                            >
                                              <div className={headerMenuTitle}>
                                                <Link to={embeddedLinkLink.href} className={headerMenuTitle}>
                                                  {embeddedLinkLink.title}
                                                </Link>
                                              </div>
                                            </ListItem>
                                          ))}
                                      </>
                                    );
                                  })}
                              </>
                            );
                          })}
                        </List>
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
