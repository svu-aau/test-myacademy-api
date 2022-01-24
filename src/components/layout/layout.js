import React from 'react';
import { navigate } from 'gatsby';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import '../../styles/layout.css';
import { content, darkContent, wrapper } from './layout.module.css';
import { cn } from '../../lib/helpers';

const Layout = ({
  children,
  siteTitle,
  siteSubtitle,
  siteSetting,
  heroImageCaption,
  headerBackgroundImage,
  menus,
  smallHeader = false,
  dark = false,
}) => (
  <>
    <Header
      smallHeader={smallHeader}
      backgroundImage={headerBackgroundImage}
      siteTitle={siteTitle}
      siteSubtitle={siteSubtitle}
      heroImageCaption={heroImageCaption}
      siteSetting={siteSetting}
    />
    <div className={wrapper}>
      {menus?.length && <Sidebar menus={menus} />}
      <div className={cn(content, dark ? darkContent : '')}>{children}</div>
    </div>
    <Footer />
  </>
);

export default Layout;
