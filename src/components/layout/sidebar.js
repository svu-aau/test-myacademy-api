import React from 'react';
import { Link } from 'gatsby';
import { sidebar, mobileParentMenu, desktopParentMenu, parentSubMenus, active } from './sidebar.module.css';

const Sidebar = ({ sidebarMenu }) => {
  const [menuOpen, toggleMenu] = React.useState(false);

  const handleToggleMenu = () => {
    toggleMenu(!menuOpen);
  };

  return (
    <aside className={sidebar} data-menu={menuOpen ? 'expanded' : 'collapsed'}>
      <span role="button" onClick={handleToggleMenu} className={mobileParentMenu} aria-expanded={menuOpen}>
        {sidebarMenu.title}
      </span>
      <span className={desktopParentMenu}>{sidebarMenu.title}</span>
      <ul className={parentSubMenus} aria-hidden={!menuOpen}>
        {sidebarMenu.links.map(
          (link) =>
            !link.hidden && (
              <li key={link.title}>
                <Link to={link.href} activeClassName={active}>
                  {link.title}
                </Link>
              </li>
            )
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
