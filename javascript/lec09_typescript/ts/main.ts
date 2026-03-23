const loginform = document.querySelector<HTMLFormElement>('#loginform')!;
const logininput =
    document.querySelector<HTMLInputElement>('#loginform input')!;
const greetingHeader = document.querySelector<HTMLElement>('#greeting')!;

if (!loginform || !logininput || !greetingHeader) {
    throw new Error('필수 DOM 요소가 없음');
}

loginform.addEventListener('submit', getName);

function getName(event: SubmitEvent) {
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
