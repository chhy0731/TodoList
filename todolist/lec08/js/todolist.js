const todoform = document.querySelector('#todoform');
const todoInput = document.querySelector('#todoform input');
const todoList_ul = document.querySelector('#todolist');
const curDate_p = document.querySelector('#cur_date');

todoform.addEventListener('submit', handleTodoSummit);

let DBLists = [];
let CurrentDate;
const DBLIST_KEY = 'DBLISTS';
// const currentUser = localStorage.getItem('myusername');
// const DBLIST_KEY = `DBLISTS_${currentUser}`;
const currentUser = localStorage.getItem('myusername');

function TodoList(date) {
    this.date = date;
    this.todos = [];
}

function clearTodoItems() {
    console.log('cleartodoitems is called');

    while (todoList_ul.firstChild) {
        todoList_ul.removeChild(todoList_ul.firstChild);
    }
}

function displayTodoItem(todoObj) {
    console.log('displayTodoItem is called');

    const todo_cur_li = document.createElement('li');
    const todo_cur_span = document.createElement('span');
    const todo_remove_btn = document.createElement('button');

    todo_cur_span.innerText = todoObj.text;
    todo_cur_li.dataset.id = todoObj.id;

    todo_remove_btn.innerText = 'X';
    todo_remove_btn.addEventListener('click', delteToDO);

    todo_cur_li.appendChild(todo_cur_span);
    todo_cur_li.appendChild(todo_remove_btn);

    todoList_ul.appendChild(todo_cur_li);
}

function delteToDO(event) {
    console.log('삭제 버튼이 클릭되었습니다.');
    const li = event.target.parentElement; // x 버튼의 이벤트
    const id = parseInt(li.dataset.id);

    // 현재 날짜 리스트 찾기
    const curTodoList = DBLists.find((list) => list.date === CurrentDate);

    if (!curTodoList) return; //투두리스트가 없으면 여기서 끝내기

    // 배열에서 실제 삭제
    curTodoList.todos = curTodoList.todos.filter((todo) => todo.id !== id);

    // 날짜에 할 일이 하나도 없으면 DBLists에서 제거
    if (curTodoList.todos.length === 0) {
        DBLists = DBLists.filter((list) => list.date !== CurrentDate);
    }

    // 화면에서 제거
    li.remove();

    // 달력 동기화

    // 저장
    saveDBListLocalStorage();
    syncCalendar();
}

function handleTodoSummit(parm) {
    console.log('handleTodoSummit is called');
    parm.preventDefault();
    const curTodo = todoInput.value;
    console.log('todoinput value : ' + curTodo);

    todoInput.value = '';

    displayTodoItem(curTodo);

    addNewTodo(CurrentDate, curTodo);

    saveDBListLocalStorage();

    loadcurrentTodo();
    syncCalendar();
}

function setCurrentDate(date) {
    console.log('setCurrentDate - ' + date);
    curDate_p.textContent = date + ' 일정';
    CurrentDate = date;
}

function addNewTodo(date, newTodo) {
    console.log('addnewtodo is called');
    let curTodoList = DBLists.find((list) => list.date === date);

    if (!curTodoList) {
        curTodoList = new TodoList(date);
        DBLists.push(curTodoList);
    }

    const todoObj = {
        id: Date.now(), // 🔥 고유 id
        text: newTodo,
    };

    curTodoList.todos.push(todoObj);
    return todoObj;
}

function saveDBListLocalStorage() {
    console.log('saveDBListLocalStorage');
    localStorage.setItem(DBLIST_KEY, JSON.stringify(DBLists));
}

function loadcurrentTodo() {
    console.log('loadcurrentTodo is called');

    //기존 투두리스트 클리어하는 부분

    clearTodoItems();

    //DBLIST 가져와서 초기화 해주는 부분
    const saveDBLists = localStorage.getItem(DBLIST_KEY);

    if (saveDBLists !== null) {
        DBLists = JSON.parse(saveDBLists);
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

function loadTodoInit() {
    console.log('loadTodoInit is called');

    //날짜 가져와서 초기화 해주는 부분
    var today = new Date();
    var formattedToday = today.toISOString().split('T')[0];

    console.log(formattedToday);
    setCurrentDate(formattedToday);

    loadcurrentTodo();
    syncCalendar();
}
