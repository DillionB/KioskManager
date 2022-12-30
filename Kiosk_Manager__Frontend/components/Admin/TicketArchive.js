import React, { useState } from 'react';
import TodoFormArchive from './TicketFormArchive';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const TicketArchive = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoFormArchive edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
          className={todo.isComplete ? 'todo-row complete' : `${todo.owner}`}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
                  onClick={() => console.log(todo.type)}
          className='delete-icon'
        />
        
      </div>
    </div>
  ));
};

export default TicketArchive;
