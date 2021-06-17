import React from 'react';
import Header from './header';
import Footer from './footer';
import '../../styles/layout.css';
import styles from './layout.module.css';
import { cn } from '../../lib/helpers';

const Layout = ({
  children,
  fixedNav,
  siteTitle,
  siteSubtitle,
  heroImageCaption,
  headerBackgroundImage,
  smallHeader = false,
  dark = false,
}) => (
  <>
    <Header
      smallHeader={smallHeader}
      fixedNav={fixedNav}
      backgroundImage={headerBackgroundImage}
      siteTitle={siteTitle}
      siteSubtitle={siteSubtitle}
      heroImageCaption={heroImageCaption}
    />
    <div className={cn(styles.content, dark ? styles.darkContent : '')}>{children}</div>
    <Footer />
  </>
);

export default Layout;
