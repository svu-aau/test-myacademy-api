import React from 'react';
import { Link } from 'gatsby';
import { sidebar, mobileParentMenu, desktopParentMenu, parentSubMenus, active } from './sidebar.module.css';
import { cn } from '../../lib/helpers';

const Sidebar = ({ menus }) => {
  const [pageMenu, setPageMenu] = React.useState(null);
  const [menuOpen, toggleMenu] = React.useState(false);

  React.useEffect(() => {
    const pathArray = location.pathname.split('/');
    const parentPath = pathArray[1];

    const menu = menus.find((menu) => menu.slug?.current === parentPath);
    setPageMenu(menu);
  }, [location.pathname]);

  const handleToggleMenu = () => {
    toggleMenu(!menuOpen);
  };

  if (!pageMenu) {
    return <></>;
  }

  return (
    <div className={cn(sidebar)} data-menu={menuOpen ? 'expanded' : 'collapsed'}>
      <span role="button" onClick={handleToggleMenu} className={mobileParentMenu} aria-expanded={menuOpen}>
        {pageMenu.title}
      </span>
      <span className={desktopParentMenu}>{pageMenu.title}</span>
      <ul className={parentSubMenus} aria-hidden={!menuOpen}>
        <li></li>
        {pageMenu.links.map((link) => (
          <li key={link.title}>
            <Link to={link.href} activeClassName={active}>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
