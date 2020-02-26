

function showMessage(message) {
  const messageElement = document.getElementById('msg');
  messageElement.innerHTML = message + '\n' + messageElement.innerHTML;
}

async function onFederatedSignin() {
  try {
    const request = new PaymentRequest([{
      supportedMethods: 'https://kenrb.github.io/WebID_Strawman/',
      data: {
      },
    }], {
      total: {
        label: 'N/A',
        amount: {
          currency: 'USD',
          value: '0.00'
        }
      }
    });
    const response = await request.show();
    document.getElementById('contents').innerHTML = 'You are now logged in as #Username';
    await response.complete('success');
  } catch (e) {
    showMessage(e.toString());
  }
}

function check() {
  if (!navigator.serviceWorker) {
    showMessage('Your browser does not support service workers.');
    return 'error';
  }

  navigator.serviceWorker.getRegistration('service_worker.js').then(registration => {
    if (!registration) {
      install();
      return 'not installed';
    }
    return 'installed';
  })
  .catch(error => {
    return 'error';
  });
}

function install() {
  navigator.serviceWorker.register('service_worker.js').then(() => {
    return navigator.serviceWorker.ready;
  })
  .then(registration => {
    if (!registration.paymentManager) {
      showMessage('This browser does not support payment handlers');
      return;
    }
    registration.paymentManager.instruments
        .set('instrument-key', {
          name: 'Chrome uses name and icon from the web app manifest',
          method: window.location.href,
      }).catch(error => {
        showMessage('install() instrument setting error: ' + error);
      });
    }).catch(error => {
      showMessage('install() registration error: ' + error);
    });
}

function uninstall() {
  navigator.serviceWorker
    .getRegistration('service_worker.js')
    .then(registration => {
      registration
        .unregister()
        .then(result => {
          if (!result) {
            showMessage('Failed to uninstall service worker',);
          }
        })
        .catch(error => {
          showMessage(error);
        });
    })
    .catch(error => {
      showMessage(error);
    });
}

function installIfNotPresent() {
  check();
}

if ((window.location.host === 'kenrb.github.io') &&
    (window.location.protocol !== 'https:')) {
  window.location.protocol = 'https:';
}

installIfNotPresent();
