import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'



function TicketForm(props) {
    let i = 0
    const [input, setInput] = useState(props.edit ? props.edit.value : '');
    const [Title, setTitle] = useState(``);
    const [Description, setDescription] = useState(``)

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

    useEffect(() => {
        handleLoad();
    }, [])

  const handleChange = e => {
      setInput(e.target.value);
      
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await axios.post("https://localhost:7242/api/Users/NewTicket",
          { Title, Description })
      
      const test = response.data[0]
      const { Ticket, Id } = test[i]
      
    props.onSubmit({
        id: `${Id}`,
        text: `${Ticket}`
    });
      setInput('');
      window.location.reload();
  };
    const handleLoad = async () => {
        const response = await axios.get("https://localhost:7242/api/Users/GetTickets",)

        const test = response.data;
 

        for (i - 0; i <= test.length; i++) {
            if (i <= test.length) {

                let { Title, Id } = test[i]
                props.onSubmit({
                    id: `${Id}`,
                    text: `${Title}`
                });
                console.log(i)
                
                setInput(``);
            }
        }
      
        
  };
    

  return (
    <form onSubmit={handleLoad} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleLoad} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Create a ticket/ report an issue'
            value={Title}
                          onChange={e => setTitle(e.target.value)} 
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Create Ticket
          </button>
        </>
      )}
    </form>
  );
}

export default TicketForm;
