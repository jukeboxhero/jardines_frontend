class Facebook {
  initFbScript() {
    if(!this.scriptPromise) {
      this.scriptPromise = new Promise((resolve, reject) => {
        window.fbAsyncInit = () => {
          window.FB.init({
            appId      : '1929547360452050',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.5'
          });
          resolve();
        };
        if (typeof(window.FB) === 'undefined') {
          (function(d, s, id) {
             var js, fjs = d.getElementsByTagName(s)[0];
             if (d.getElementById(id)) { return; }
             js = d.createElement(s); js.id = id;
             js.src = "https://connect.facebook.net/en_US/sdk.js";
             fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));
        }
      })
    }
    return this.scriptPromise;
  }

  getLoginStatus(callback) {
    return this.initFbScript().then(() => window.FB.getLoginStatus(callback));
  }
}

export default Facebook