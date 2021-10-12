import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import ContentSections from '../pagebuilder/content-sections';

const ContactUs = () => {
  return (
    <StaticQuery
      query={contactUsGlobalSection}
      render={({ contactUsSection }) => {
        const { content, slug } = contactUsSection || {};
        return content && <ContentSections content={content} slug={slug.current} />;
      }}
    />
  );
};

const contactUsGlobalSection = graphql`
  query ContactUsGlobalSectionQuery {
    #
    # There are 2 available card-blocks for contact-us
    # 1. contact-us-section (typical)
    # 2. contact-us-2-column-section (enable 2 columns)
    #
    contactUsSection: sanityGlobalSection(slug: { current: { eq: "contact-us-section" } }) {
      ...GlobalSection
    }
  }
`;

export default ContactUs;
