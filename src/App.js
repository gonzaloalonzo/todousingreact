import React, { useEffect, useState} from 'react';
import TodoForm  from './components/TodoForm'
import TodoList from './components/TodoList'
import Typograpy from '@material-ui/core/Typography';
import'./App.css';

const LOCAL_STORAGE_KEY = 'react-tdo-list-todos';

function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
   if(storageTodos){
     setTodos(storageTodos);
   }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(todo){
    setTodos(
      [todo, ...todos]);
      }
  
   function toggleComplete(id){
      setTodos(
        todos.map(todo => {
          if(todo.id === id){
            return{
              ...todo,
              completed: !todo.completed
            };
          }
          return todo;
        })
      );
   }

   function removeTodo(id){
     setTodos(todos.filter(todo => todo.id !== id));
   }

  return (
    <>
      <Typograpy style={{padding:16}} variant="h1">Todos</Typograpy>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        removeTodo={removeTodo}
      />
    </>
  );
}

export default App;
