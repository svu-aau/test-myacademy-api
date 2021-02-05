import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import ContentSections from '../pagebuilder/content-sections';

const ContactUs = () => {
  return (
    <StaticQuery
      query={contactUsGlobalSection}
      render={({ contactUsSection }) => {
        const { content } = contactUsSection || {};
        return content && <ContentSections content={content} />;
      }}
    />
  );
};

const contactUsGlobalSection = graphql`
  query ContactUsGlobalSectionQuery {
    contactUsSection: sanityGlobalSection(slug: { current: { eq: "contact-us-section" } }) {
      ...GlobalSection
    }
  }
`;

export default ContactUs;
