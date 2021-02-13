const LogRocket = require('logrocket');
require('cookieconsent');
require('cookieconsent/build/cookieconsent.min.css');

exports.onInitialClientRender = (_, { publicId }) => {
  if (process.env.NODE_ENV !== 'development') {
    LogRocket.init('46bi0w/academy-of-art-u-spring-show');
  }

  const swiftypeSearch = document.createElement('script');
  swiftypeSearch.innerHTML = `
    (function(w,d,t,u,n,s,e){w['SwiftypeObject']=n;w[n]=w[n]||function(){
    (w[n].q=w[n].q||[]).push(arguments);};s=d.createElement(t);
    e=d.getElementsByTagName(t)[0];s.async=1;s.src=u;e.parentNode.insertBefore(s,e);
  })(window,document,'script','//s.swiftypecdn.com/install/v2/st.js','_st');

    _st('install','VThQZ8pz6zzDmtbhaDxm','2.0.0');
  `;
  document.body.appendChild(swiftypeSearch);

  window.cookieconsent.initialise({
    palette: { popup: { background: '#f2f5f9', text: '#252525' }, button: { background: '#ee3224' } },
    theme: 'edgeless',
    position: 'bottom',
    content: {
      href: 'https://www.academyart.edu/cookie-policy/',
    },
  });
};
