import React, { useState } from 'react';
import './index.css'
import {AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai'

function TodoApp() {

  
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    if (editIndex !== -1) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = { ...updatedTodos[editIndex], text: newTodo };
      setTodos(updatedTodos);
      setNewTodo('');
      setEditIndex(-1);
    } else {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = (index) => {
    setNewTodo(todos[index].text);
    setEditIndex(index);
  };

  const toggleTodoCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = { ...updatedTodos[index], completed: !updatedTodos[index].completed };
    setTodos(updatedTodos);
  };

  return (
    <div className=' flex flex-col mt-40 items-center gap-4'>
    
      <h1 className='text-lg font-bold'>Todo App</h1>
      
      <div className={`flex flex-col  p-3  ${todos.length > 0 ? 'gap-y-2' : ''}`}>
        <div>
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className='p-3 outline-none border-2 border-r-0 border-gray-500'
        />
        <button  className='py-3 px-5 font-semibold border-2 border-gray-500' onClick={addTodo}>{editIndex !== -1 ? 'Edit' : 'Add'}</button>
       </div>
      
      
      <ul className='flex flex-col gap-2'>
        {todos.map((todo, index) => (
          <li key={index} className='flex flex-row gap-3 p-3 justify-between border-2 border-gray-500'>
            <div className='flex gap-4'>
              <input
                 type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodoCompletion(index)}
               />
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
              </span>
            </div>

            <div className='flex gap-4'>
            <button onClick={() => deleteTodo(index)}><AiOutlineDelete size={20}/></button>
            <button onClick={() => editTodo(index)}><AiOutlineEdit size={20}/></button>
            </div>
          </li>
        ))}
      </ul>

      </div>

    </div>
  );
}

export default TodoApp;
