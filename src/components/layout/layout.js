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
    />
    <div className={cn(styles.content, dark ? styles.darkContent : '')}>{children}</div>
    <Footer />
  </>
);

export default Layout;
