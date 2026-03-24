const loginform = document.querySelector('#loginform');
const logininput = document.querySelector('#loginform input');
const greetingHeader = document.querySelector('#greeting');

loginform.addEventListener('submit', getName);

function getName(param) {
  param.preventDefault();
  const username = logininput.value;

  loginform.style.display = 'none';

  greetingHeader.innerHTML = '안녕하세요! ' + username + '님';
  localStorage.setItem('myusername', username);
}

const stored_username = localStorage.getItem('myusername');
if (stored_username === null) {
} else {
  loginform.style.display = 'none';
  greetingHeader.innerHTML = '안녕하세요! ' + stored_username + '님';
}
