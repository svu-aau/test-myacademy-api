// dynamic link component that uses Link for internal and anchors for external hrefs
import React from 'react';
import { Link } from 'gatsby';

export default function MenuLink({ href, title, hidden }) {
  if (hidden) {
    return null;
  }

  return href.indexOf('http') === 0 ? (
    <a target="_blank" rel="noopener" href={href} title={title}>
      {title}
    </a>
  ) : (
    <Link to={href} title={title}>
      {title}
    </Link>
  );
}
