// 1. 입력(행위_Enter를 눌러서 할 일 목록 추가)에 대한 이벤트 리스너(Event Listener) 등록하기

// 1-1. DOM을 통해 todo input 요소 가져오기
const todoInputElem = document.querySelector('.todo-input');

// 1-2. 새로운 todo가 추가되면 빈 배열(todo 리스트)에 추가하기 위해 빈 배열 생성
let todos = [];
let id = 0; // 각각의 todo들을 구별할 수 있는 키값을 지정하기 위해서 사용







// 2. 할 일 추가하기
// 2-1. 할 일의 타입 정의 -> { id: number;  isCompleted: boolean;  content: string }
    // id : number 타입으로, 할 일의 유니크한 키 값이다.
    // isCompleted :  boolean 타입으로, 할 일의 완료상태를 나타낸다. 
    // content : string 타입으로, 할 일의 내용이다.

// 2-2. appendTodo()함수를 통해서 만들어진 새로운 배열을 getAllTodos() 함수에서 복사한 배열에 덮어씌운다.
    // 여기서 포인트는 초기 원본 배열(todos)은 건드리지 않는다는 것이다!!
const setTodos = (newTodos) => {
    todos = newTodos; 
    // return이 없는 이유: 상태를 변경해주는 역할만 수행하는 함수일 뿐, output을 반환할 필요는 없기 때문에
    // React로 보면 useState함수의 setState를 통해서 상태를 변경시켜주는 것과 같다는 생각이 든다.
};

// 2-3. 현재 할 일(todos) 목록을 가져오는 함수를 만든다.
    // -> 왜? todos 원본 배열의 값을 변경시키지 않고 복사해서 사용하기 위해서
const getAllTodos = () => {
    return todos;
};

// 2-4. 할 일을 추가하는 함수 appendTodo() 생성하여 '동작'하게 한다.
const appendTodos = (text) => { // 15번째줄 확인하기
    // 새롭게 저장되는 할 일의 id값으로써 중복되지 않도록 하기 위해 증가시킨 후 새로 선언 및 할당
    const newId = id++;
    // 새롭게 추가된 할 일 목록(배열)을 선언 및 할당한다.
    const newTodos = [...getAllTodos(), {id: newId, isCompleted: false, content: text}];
    // setTodos()함수를 통해 새로운 배열을 getAllTodos() 함수에서 복사한 배열에 덮어씌운다.
    setTodos(newTodos); // 여기까지는 상태만 바꾸고 화면에는 렌더링되지 않은 상태이다.
    // 할 일이 추가될 때마다 paitTodos()함수를 실행하여 추가한다. -> HTML 파일 확인하기
    paintTodos();
}





// 3. 할 일이 추가될 때마다, paintTodos()함수를 실행하여 '화면에 렌더링'하기

// 3-1. 'todo-list' 클래스 네임을 가진 ul요소를 전역으로 사용하기 위해 DOM을 통해 불러오기
const todoListElem = document.querySelector('.todo-list');

// 3-2. 할 일을 화면에 렌더링하기 위해 실행시킬 함수 만들기
const paintTodos = () => {
    // 위에서 가져온 todoListElem 요소 안의 HTML 초기화 -> 왜?
        // 만약 초기화하지 않는다면, paintTodos()함수 실행할 때마다, 기존의 HTML이 중복되면서 표현된다.
    todoListElem.innerHTML = null; 
    // 초기화된 todo-list에다가 (위에서 사용자의 동작에 따라 만들어진) todo 배열 가져오기
    const allTodos = getAllTodos(); 
    // 그 다음 todos 배열을 가져와 forEach문을 사용하여,
    // 각 할 일을 "todo-item"에 해당하는 HTML로 만들어서 
    // appendChild()로 "todo-list"에 자식 요소 추가하기
    allTodos.forEach(todo => { // 배열의 요소를 하나씩 순회하면서 각 요소(todo)에 함수를 적용한다.
        // 새로 알게 된 내용: 
            // Element.className으로 이벤트를 주면 기존 클래스 값을 교체해버린다.
            // Element.classList로 이벤트를 주면 읽기 전용이기 때문에 클래스 자체를 건드리지 않고 클래스를 추가/삭제할 수 있다.

        const todoItemElem = document.createElement('li');
        todoItemElem.classList.add('todo-item');
        
        const checkBoxElem = document.createElement('div'); // ✔
        checkBoxElem.classList.add('checkbox');

        const todoElem = document.createElement('div'); // 첫번째 할 일
        todoElem.classList.add('todo');
        todoElem.innerText = todo.content;

        const delBtnElem = document.createElement('button'); // X (버튼)
        delBtnElem.classList.add('delBtn');
        delBtnElem.innerHTML = 'X';

    // ***innerHTML과 innerText과 textContent 차이***
    // innerHTML은 요소 내에 있는 HTML과 XML 모두를 의미하고,
    // innerText는 요소 내에서 사용자에게 보여지는 text를 의미하고,
    // textContent는 script나 style 태그와 상관없이 해당 노드가 가지고 있는 text를 의미한다.

        // 할 일 타입을 정의한 isCompleted를 사용해서 해당 todo가 완료된 일인지 아닌지를 판단하여, 
        if(todo.isCompleted) {
            // 'todo-list'요소에 'checked'라는 클래스 네임을 더해준다.
            todoItemElem.classList.add('checked');
            checkBoxElem.innerText = '✔';
        }

        todoItemElem.appendChild(checkBoxElem);
        todoItemElem.appendChild(todoElem);
        todoItemElem.appendChild(delBtnElem);

        todoListElem.appendChild(todoItemElem);
    });
}
// ---
// 1-3. todo.js 파일이 실행되자마자 호출되는 함수 -> 왜 만들었어? 아직 몰라
const init = () => {
    todoInputElem.addEventListener('keypress', (event) => {
        // 만약 입력되는 값이 'Enter'라면,   
        if(event.key === 'Enter') {
            // appendTodo 함수에 event.target.value를 전달해줘서 실행시키고,
            appendTodos(event.target.value); 
            // input 요소(todoInputElem)의 value 값을 초기화-> 추가가 된거니까 초기값으로 리셋
            todoInputElem.value = '';
        }
    });
};
// console.log(init);
// 1-4. input 요소를 담은 todoInputElem에 'keypress'이벤트를 등록시킨다.
init(); 