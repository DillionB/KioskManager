import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'



function TicketFormArchive(props) {
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
      const response = await axios.post("https://localhost:7242/api/Users/NewArchive",
          { Title, Description })
      
      const test = response.data[0]
      const { Ticket } = test[i]
      
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
        text: `${Ticket}`
    });
    setInput('');
  };
    const handleLoad = async () => {
        const response = await axios.get("https://localhost:7242/api/Users/GetArchive",)

        const test = response.data;
 

        for (i - 0; i <= test.length; i++) {
            if (i <= test.length) {

                let { Title } = test[i]
                props.onSubmit({
                    id: Math.floor(Math.random() * 10000+i),
                    text: `${Title}`
                });
                console.log(i)
                
                setInput(``);
            }
        }
      
        
  };
    

  return (
    <form onSubmit={handleLoad} className='todo-form2'>
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
          <button onClick={handleLoad} className='todo-button edit2'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder=''
            value={Title}
                          onChange={e => setTitle(e.target.value)} 
            name='text'
            className='todo-input2'
            ref={inputRef}
          />
          
        </>
      )}
    </form>
  );
}

export default TicketFormArchive;
