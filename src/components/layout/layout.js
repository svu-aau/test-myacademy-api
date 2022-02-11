import React from 'react';
import { navigate } from 'gatsby';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import '../../styles/layout.css';
import { content, darkContent, wrapper, contentTop, main } from './layout.module.css';
import { cn } from '../../lib/helpers';
import ContentSections from '../pagebuilder/content-sections';

const Layout = ({
  children,
  siteTitle,
  siteSubtitle,
  siteSetting,
  heroImageCaption,
  headerBackgroundImage,
  sidebar,
  smallHeader = false,
  dark = false,
  firstSection,
}) => {
  return (
    <>
      <Header
        smallHeader={smallHeader}
        backgroundImage={headerBackgroundImage}
        siteTitle={siteTitle}
        siteSubtitle={siteSubtitle}
        heroImageCaption={heroImageCaption}
        siteSetting={siteSetting}
      />
      <main className={main}>
        {sidebar && <ContentSections content={[firstSection]} />}
        <div className={wrapper}>
          {sidebar && <Sidebar sidebarMenu={sidebar} />}
          <div className={cn(content, dark ? darkContent : '', sidebar ? contentTop : '')}>{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
