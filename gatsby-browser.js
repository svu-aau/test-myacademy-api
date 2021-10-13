// const LogRocket = require('logrocket');
require('cookieconsent');
require('cookieconsent/build/cookieconsent.min.css');

exports.onInitialClientRender = (_, { publicId }) => {
  window.cookieconsent.initialise({
    palette: { popup: { background: '#f2f5f9', text: '#252525' }, button: { background: '#ee3224' } },
    theme: 'edgeless',
    position: 'bottom',
    content: {
      href: 'https://www.academyart.edu/cookie-policy/',
    },
  });
};
