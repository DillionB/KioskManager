import React, { useState } from 'react';
import TodoForm from './TicketForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { Modal } from './Modal'
import axios from 'axios'


const Ticket = ({ todos, completeTodo, removeTodo, updateTodo }) => {

    const [showModal, setShowModal] = useState(false);
    const [modalId, setModalId] = useState('');
    const [dataTitle, setDataTitle] = useState('');
    const [dataDesc, setDataDesc] = useState('');
    const [dataType, setDataType] = useState('');
    const [dataOwner, setDataOwner] = useState('');
    
    const openModal = (id, text, desc, type, owner) => {
        setShowModal(prev => !prev);
        setModalId(id);
        setDataTitle(text);
        setDataDesc(desc);
        setDataType(type);
        setDataOwner(owner);
    };
     
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
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

    return todos.map((todo, index) => (

    <div
            className={todo.isComplete ? 'todo-row complete' : `${todo.type}`}
      key={index}
        >
            <Modal showModal={showModal} setShowModal={setShowModal} modalId={modalId} setModalId={setModalId} dataTitle={dataTitle} setDataTitle={setDataTitle} dataDesc={dataDesc} setDataType={setDataType} dataType={dataType} setDataOwner={setDataOwner} dataOwner={dataOwner}  />    
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text}
                
      </div>
      <div className='icons'>
              <RiCloseCircleLine 
                  onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
                    onClick={() => openModal(todo.id, todo.text, todo.description, todo.type, todo.owner)}
          className='edit-icon'
                />

          </div>

    </div>
  ));
};

export default Ticket;
