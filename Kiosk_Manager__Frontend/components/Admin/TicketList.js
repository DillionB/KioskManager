import React, { useState } from 'react';
import Navbar from './Navbar'
import TodoForm from './TicketForm';
import Todo from './Ticket';
import axios from 'axios';
import handleLoad from './'


function TicketList() {

    const [todos, setTodos] = useState([]);
    

    const addTodo = todo => {
        
        

        todos.push(todo);
        

    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [...todos];

    setTodos(newTodos);
    
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

    const removeTodo = async id => {
        const removedArr = [...todos].filter(todo => todo.id !== id);
        const removedTicket = [...todos].filter(todo => todo.id === id);
        const Ticket = removedTicket[0]
        

        
        
        const Title = Ticket.text
        const Description = Ticket.text
        const Type = Ticket.type
        const Owner = Ticket.owner

        await axios.post("https://localhost:7242/api/Users/NewArchive",
            { Type, Title, Owner, Description })
        const i = id
       
        
        axios.delete("https://localhost:7242/api/Users/DeleteTicket", { params: { Id: id } } )
        window.location.reload();
    setTodos(removedArr);  
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
      <>
       
      <h1>Active Tickets</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TicketList;
