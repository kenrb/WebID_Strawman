
currentUserName = "#Username";

function onSignIn() {
  let response = {status: 'success'};
  response.username = currentUserName;
  navigator.serviceWorker.controller.postMessage(response);
}

function changeUser() {
  document.getElementById('contents').style.display = 'none';
  document.getElementById('userSelection').style.display = 'block';
}

function updateUser() {
  document.getElementById('contents').style.display = 'block';
  document.getElementById('userSelection').style.display = 'none';
  currentUserName = document.getElementById('newuser').value;
  document.getElementById('username').innerHTML = 'You are currently signed in to FACETWITGRAM as ' + currentUserName + '.';
  document.getElementById('signin-button').innerHTML = 'Continue as ' + currentUserName;
}
