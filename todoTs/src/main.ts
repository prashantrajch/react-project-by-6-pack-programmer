import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

// const todos: Todo[] = [];
// const todos = [] as Todo[];
const todos: Array<Todo> = [];

const todosContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;

const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000),
  };

  todos.push(todo);
  todoInput.value = "";
  renderTodo(todos);
};

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo = document.createElement("div") as HTMLDivElement;
  todo.className = "todo";
  const checkBox = document.createElement("input") as HTMLInputElement;
  checkBox.type = "checkbox";
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;

  checkBox.onchange = () => {
    todos.find((item) => {
      if (item.id === id) item.isCompleted = checkBox.checked;
    });
    para.className = checkBox.checked ? "textCut" : "";
  };

  // create P for Title
  const para: HTMLParagraphElement = document.createElement("p");
  para.innerText = title;
  para.className = isCompleted ? "textCut" : "";

  // create Button for Delte
  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";

  btn.onclick = () => {
    deleteTodo(id);
  };

  // Appending All to TotoItem

  todo.append(checkBox, para, btn);

  todosContainer.append(todo);
};

const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  renderTodo(todos);
};

const renderTodo = (todos: Todo[]) => {
  todosContainer.innerText = "";
  todos.forEach((item) => {
    generateTodoItem(item.title, item.isCompleted, item.id);
  });
};
