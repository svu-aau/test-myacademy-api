import React from 'react';
import Header from './header';
import Footer from './footer';
import '../../styles/layout.css';
import { content, darkContent } from './layout.module.css';
import { cn } from '../../lib/helpers';

const Layout = ({
  children,
  siteTitle,
  siteSubtitle,
  siteSetting,
  heroImageCaption,
  headerBackgroundImage,
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
    <div className={cn(content, dark ? darkContent : '')}>{children}</div>
    <Footer />
  </>
);

export default Layout;
