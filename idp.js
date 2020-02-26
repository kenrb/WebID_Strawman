
function onSignIn() {
	navigator.serviceWorker.controller.postMessage({status: 'success'});
}
