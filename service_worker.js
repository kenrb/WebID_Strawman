self.resolver = null;

// Receive a postMessage when the IDP has completed sign-in.
self.addEventListener('message', (evt) => {
  console.log(evt.data);
  if (evt.data && self.resolver !== null) {
    self.resolver({
      methodName: 'https://kenrb.github.io/WebID_Strawman/',
      details: evt.data
    });
    self.resolver = null;
  }
});

// Code for handling actual sign-in event aka payment request.
self.addEventListener('paymentrequest', (evt) => {
  evt.respondWith(new Promise((resolve) => {
    self.resolver = resolve;
    evt.openWindow('idp_signin.html');
  }));
});
