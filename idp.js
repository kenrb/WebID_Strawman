
currentUserName = "#Username";

function onSignIn() {
  let response = {status: 'success'};
  response.username = currentUserName;
  navigator.serviceWorker.controller.postMessage(response);
}

function changeUser() {
  document.getElementById('contents').style.display = 'none';
  document.getElementById('multiSelect').style.display = 'none';
  document.getElementById('userSelection').style.display = 'block';
}

function updateUser() {
  selectUser(document.getElementById('newuser').value);
}

function selectUser(name) {
  document.getElementById('contents').style.display = 'block';
  document.getElementById('userSelection').style.display = 'none';
  document.getElementById('multiSelect').style.display = 'none';
  currentUserName = name;
  document.getElementById('username').innerHTML = 'Click sign-in to continue as ' + currentUserName + '.';
  document.getElementById('signin-button').innerHTML = 'Sign in as ' + currentUserName;
}
