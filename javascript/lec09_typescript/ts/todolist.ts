import { syncCalendar } from './calendar.js';

const todoform = document.querySelector<HTMLFormElement>('#todoform')!;
const todoInput = document.querySelector<HTMLInputElement>('#todoform input')!;
const todoList_ul = document.querySelector<HTMLElement>('#todolist')!;
const curDate_p = document.querySelector<HTMLElement>('#cur_date')!;

if (!todoform || !todoInput || !todoList_ul || !curDate_p) {
    throw new Error('필수 DOM 요소가 없음');
}
todoform.addEventListener('submit', handleTodoSummit);
// 타입 정의

type todo = {
    id: number;
    text: string;
};

type DBList = {
    date: string;
    todos: todo[];
};

export let DBLists: DBList[] = [];
export let CurrentDate: string = '';

const DBLIST_KEY = 'DBLISTS';
const currentUser = localStorage.getItem('myusername');

// function createTodoList(date: string): DBList {
//     return {
//         date,
//         todos: [],
//     };
// }

//초기화 함수
export function loadTodoInit(): void {
    console.log('loadTodoInit is called');

    //날짜 가져와서 초기화 해주는 부분
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    console.log(formattedToday);
    setCurrentDate(formattedToday);

    loadcurrentTodo();
    syncCalendar();
}

//이벤트 핸들러
function handleTodoSummit(event: SubmitEvent): void {
    console.log('handleTodoSummit is called');

    event.preventDefault();
    const curTodo = todoInput.value;
    console.log('todoinput value : ' + curTodo);

    todoInput.value = '';

    const newTodoObj = addNewTodo(CurrentDate, curTodo);
    displayTodoItem(newTodoObj);

    saveDBListLocalStorage();
    loadcurrentTodo();
    syncCalendar();
}

function delteToDO(event: MouseEvent): void {
    console.log('삭제 버튼이 클릭되었습니다.');

    const li = (event.target as HTMLButtonElement)
        .parentElement as HTMLLIElement;
    if (!li) return;

    const id = parseInt(li.dataset.id!);

    // 현재 날짜 리스트 찾기
    const curTodoList = DBLists.find((list) => list.date === CurrentDate);
    if (!curTodoList) return;

    // 배열에서 실제 삭제
    curTodoList.todos = curTodoList.todos.filter((todo) => todo.id !== id);

    // 날짜에 할 일이 하나도 없으면 DBLists에서 제거
    if (curTodoList.todos.length === 0) {
        DBLists = DBLists.filter((list) => list.date !== CurrentDate);
    }

    // 화면에서 제거
    li.remove();

    saveDBListLocalStorage();
    syncCalendar();
}

//핵심 로직
function addNewTodo(date: string, newTodo: string): todo {
    console.log('addnewtodo is called');
    let curTodoList = DBLists.find((list) => list.date === date);

    if (!curTodoList) {
        curTodoList = {
            date: date,
            todos: [],
        };
        DBLists.push(curTodoList);
    }

    const todoObj = {
        id: Date.now(), // 🔥 고유 id
        text: newTodo,
    };

    curTodoList.todos.push(todoObj);
    return todoObj;
}

export function setCurrentDate(date: string): void {
    console.log('setCurrentDate - ' + date);
    curDate_p.textContent = date + ' 일정';
    CurrentDate = date;
}

//UI 관련 함수
function displayTodoItem(todoObj: todo): void {
    console.log('displayTodoItem is called');

    const todo_cur_li = document.createElement('li');
    const todo_cur_span = document.createElement('span');
    const todo_remove_btn = document.createElement('button');

    todo_cur_span.innerText = todoObj.text;
    todo_cur_li.dataset.id = String(todoObj.id);

    todo_remove_btn.innerText = 'X';
    todo_remove_btn.addEventListener('click', delteToDO);

    todo_cur_li.appendChild(todo_cur_span);
    todo_cur_li.appendChild(todo_remove_btn);

    todoList_ul.appendChild(todo_cur_li);
}

function clearTodoItems(): void {
    console.log('cleartodoitems is called');

    while (todoList_ul.firstChild) {
        todoList_ul.removeChild(todoList_ul.firstChild);
    }
}

//데이터 처리 함수
function saveDBListLocalStorage(): void {
    console.log('saveDBListLocalStorage');
    localStorage.setItem(DBLIST_KEY, JSON.stringify(DBLists));
}

export function loadcurrentTodo() {
    console.log('loadcurrentTodo is called');

    //기존 투두리스트 클리어하는 부분
    clearTodoItems();

    //DBLIST 가져와서 초기화 해주는 부분
    const saveDBLists = localStorage.getItem(DBLIST_KEY);

    if (saveDBLists !== null) {
        DBLists = JSON.parse(saveDBLists) as DBList[];
    }

    console.log(DBLists);

    //DBLists 화면에 출력
    if (!DBLists) {
        return;
    }

    DBLists.forEach((tlists) => {
        if (tlists.date === CurrentDate) {
            tlists.todos.forEach(displayTodoItem);
        }
    });
}
