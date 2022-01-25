import React from 'react';
import { Link } from 'gatsby';
import { sidebar, mobileParentMenu, desktopParentMenu, parentSubMenus, active } from './sidebar.module.css';

const Sidebar = ({ menus, location }) => {
  const [pageMenu, setPageMenu] = React.useState(null);
  const [menuOpen, toggleMenu] = React.useState(false);

  // Handle 404 & Error page
  if (!location) {
    return null;
  }

  React.useEffect(() => {
    const pathArray = location.pathname.split('/');
    const parentPath = pathArray[1];

    const menu =
      parentPath &&
      menus.find((menu) => {
        const menuItem = menu.slug?.current.match(parentPath);

        if (menuItem?.length) {
          return menu;
        }
      });
    setPageMenu(menu);
  }, []);

  const handleToggleMenu = () => {
    toggleMenu(!menuOpen);
  };

  if (!pageMenu) {
    return null;
  }

  return (
    <aside className={sidebar} data-menu={menuOpen ? 'expanded' : 'collapsed'}>
      <span role="button" onClick={handleToggleMenu} className={mobileParentMenu} aria-expanded={menuOpen}>
        {pageMenu.title}
      </span>
      <span className={desktopParentMenu}>{pageMenu.title}</span>
      <ul className={parentSubMenus} aria-hidden={!menuOpen}>
        {pageMenu.links.map((link) => (
          <li key={link.title}>
            <Link to={link.href} activeClassName={active}>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
