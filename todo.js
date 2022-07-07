
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
            // appendTodo 함수에 event.target.value를 넘겨주고,
            appendTodos(event.target.value); 
            // input 요소(todoInputElem)의 value 값을 초기화-> 초기값으로 리셋
            todoInputElem.value = '';
        }
    });
};
// console.log(init)
// 1-4. input 요소를 담은 todoInputElem에 'keypress'이벤트를 등록시킨다.
init(); 


// 2. 할 일 추가하기



