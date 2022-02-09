import React from 'react';
import { navigate } from 'gatsby';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import '../../styles/layout.css';
import { content, darkContent, wrapper, contentTop } from './layout.module.css';
import { cn } from '../../lib/helpers';
import ContentSections from '../pagebuilder/content-sections';

const Layout = ({
  children,
  siteTitle,
  siteSubtitle,
  siteSetting,
  heroImageCaption,
  headerBackgroundImage,
  menus,
  location,
  smallHeader = false,
  dark = false,
  firstSection,
}) => {
  const [pageHasSidebar, setPageSidebar] = React.useState(false);

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
      <ContentSections content={[firstSection]} />
      <div className={wrapper}>
        <Sidebar menus={menus} location={location} setPageSidebar={setPageSidebar} />
        <div className={cn(content, dark ? darkContent : '', pageHasSidebar ? contentTop : '')}>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
