// dynamic link component that uses Link for internal and anchors for external hrefs
import React from 'react';
import { Link } from 'gatsby';
import { isExternalLink, linkUrlParser } from '../serializers';

export default function MenuLink({ href, title, hidden, className, onClick }) {
  if (hidden) {
    return null;
  }
  const link = linkUrlParser(href);
  if (isExternalLink(link)) {
    return (
      <a
        onClick={onClick ? onClick : () => {}}
        className={className}
        target="_blank"
        rel="noopener"
        href={link}
        title={title}
      >
        <span>{title}</span>
      </a>
    );
  } else {
    return (
      <Link onClick={onClick ? onClick : () => {}} className={className} to={link} title={title}>
        <span>{title}</span>
      </Link>
    );
  }
}
