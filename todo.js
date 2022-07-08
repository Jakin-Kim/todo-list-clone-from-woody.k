// 1. 입력에 대한 이벤트 리스너(Event Listener) 등록하기
// 1-1. DOM을 통해 todo input 요소 가져오기
const todoInputElem = document.querySelector('.todo-input');

// 1-2. 새로운 todo가 추가되면 빈 배열(todo 리스트)에 추가하기 위해 빈 배열 생성
let todos = [];
let id = 0; // 각각의 todo들을 구별할 수 있는 키값을 지정하기 위해서 사용

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




// 2. 할 일 추가하기
// 2-1. 할 일의 타입 정의 -> { id: number;  isCompleted: boolean;  content: string }
    // id : number 타입으로, 할 일의 유니크한 키 값이다.
    // isCompleted :  boolean 타입으로, 할 일의 완료상태를 나타낸다. 
    // content : string 타입으로, 할 일의 내용이다.

// 2-2. appendTodo()함수를 통해서 만들어진 새로운 배열을 getAllTodos() 함수에서 복사한 배열에 덮어씌운다.
    // 여기서 포인트는 초기 원본 배열(todos)는 건드리지 않는다는 것이다!!
const setTodos = (newTodos) => {
    todos = newTodos; 
    // return이 없는 이유: 값을 replace해주는 역할만 수행하는 함수일 뿐 output을 반환할 필요는 없기 때문에
};

// 2-3. 현재 할 일(todos) 목록을 가져오는 함수를 만든다.
    // -> 왜? todos 원본 배열의 값을 변경시키지 않고 복사해서 사용하기 위해서
const getAllTodos = () => {
    return todos;
};


// 2-2. 할 일을 추가하는 함수 appendTodo() 생성
const appendTodo = () => {
    // 새롭게 저장되는 할 일의 id값으로써 중복되지 않도록 하기 위해 증가시킨 후 새로 선언 및 할당
    const newId = id++;
    // 새롭게 추가된 할 일 목록(배열)을 선언 및 할당한다.
    const newTodos = [...getAllTodos(), {id: newId, isCompleted: false, content: text}];
    // setTodos()함수를 통해 새로운 배열을 getAllTodos() 함수에서 복사한 배열에 덮어씌운다.
    setTodos(newTodos);
    // paintTodos();
}
