// const LogRocket = require('logrocket');
require('cookieconsent');
require('cookieconsent/build/cookieconsent.min.css');

function loadCalender() {
  window.jQuery(document).ready(function ($) {
    $('#eventoncontent').evoCalendar({
      api: 'https://www.academyart.edu/wp-json/eventon/calendar',
      calendar_url: '',
      new_window: true,
      loading_text: 'Loading Calendar...',
    });
  });
}

exports.onRouteUpdate = ({ location }) => {
  if (location.pathname.includes('calendar')) {
    if (window.jQuery === undefined) {
      const jQuery = document.createElement('script');
      jQuery.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js';
      jQuery.onload = loadCalender;

      const eventon = document.createElement('script');
      eventon.src = 'https://www.academyart.edu/wp-content/plugins/eventon-api/eventon.js?ver=1.0.2';

      document.body.append(jQuery, eventon);
    } else {
      loadCalender();
    }
  }
};

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
