"use strict";
const loginform = document.querySelector('#loginform');
const logininput = document.querySelector('#loginform input');
const greetingHeader = document.querySelector('#greeting');
if (!loginform || !logininput || !greetingHeader) {
    throw new Error('필수 DOM 요소가 없음');
}
loginform.addEventListener('submit', getName);
function getName(event) {
    event.preventDefault();
    const username = logininput.value;
    loginform.style.display = 'none';
    greetingHeader.innerHTML = '안녕하세요! ' + username + '님';
    localStorage.setItem('myusername', username);
}
const stored_username = localStorage.getItem('myusername');
if (stored_username !== null) {
    loginform.style.display = 'none';
    greetingHeader.innerHTML = '안녕하세요! ' + stored_username + '님';
}
//# sourceMappingURL=main.js.map