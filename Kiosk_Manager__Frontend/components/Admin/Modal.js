import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { Lease } from './Lease'
import axios from 'axios'

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -750px;
  margin-bottom: 70px;
  z-index:99;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #161a2b;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;


const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color:#fff;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
    margin-right: 100px;
  }
button1 {
    padding: 10px 20px;
    background: #ff0d00;
    color: #ff0d00;
    border: none;
    margin-left: 450px;
  }
button2 {
    padding: 10px 20px;
    background: #f6ff00;
    color: #f6ff00;
    border: none;
    margin-left: 15px;
  }
button3 {
    padding: 10px 20px;
    background: #00ff1e;
    color: #00ff1e;
    border: none;
    margin-left: 15px;
  }
button4 {
    padding: 10px 20px;
    background: #0055ff;
    color: #0055ff;
    border: none;
    margin-left: 15px;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal = ({ showModal, setShowModal, modalId, dataTitle, dataDesc, dataType, dataOwner }) => {
    
    const [input, setInput] = useState('');
    const [tempTitle, setTempTitle] = useState(``);
    const [tempType, setTempType] = useState(``);
    const [tempOwner, setTempOwner] = useState(``);
    const [tempDesc, setTempDesc] = useState(``);


    

    const modalRef = useRef();

    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(-100%)`
    });

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
                console.log('I pressed');
            }
        },
        [setShowModal, showModal]
    );

    useEffect(
        () => {
            setTempTitle(dataTitle)
            setTempDesc(dataDesc)
            setTempType(dataType)
            setTempOwner(dataOwner)
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]

    );

    const loadModal = async (modalId) => {
        setShowModal(prev => !prev);
        const response = await axios.get("https://localhost:7242/api/Users/GetTickets",)
        
        const tickets = response.data;
        

        const data = tickets.find(Id => {
            if (`${Id.Id}` === modalId) {
                
                return true

            }

        });
        
        



    };
    loadModal(modalId)

    const handleUpdate = async () => {
        
        const response = await axios.get("https://localhost:7242/api/Users/GetTickets",)

        const tickets = response.data;

        const data = tickets.find(Id => {
            if (`${Id.Id}` === modalId) {
                console.log(Id.Id);
                console.log(modalId);
                return true

            }

        });

        const Title = tempTitle;
        const Description = tempDesc;
        const Owner = tempOwner;
        const Type = tempType;
        const Id = modalId;

        const updateResponse = await axios.post("https://localhost:7242/api/Users/UpdateTicket",
            { Type, Title, Owner, Description, Id })

        const test = updateResponse
        console.log(test)
        
        window.location.reload();
        
    };
    const handleTitleChange = t => {
        setTempTitle(t.target.value);
        
        
    };

    const handleDescChange = d => {
        setTempDesc(d.target.value);
        
    };

    return (
        <>
            
            {showModal ? (
                <Background onClick={closeModal} ref={modalRef}>
                    <animated.div style={animation}>
                        <ModalWrapper showModal={showModal}>
                            
                            <ModalContent>
                                <div>

                                    <button1 onClick={() => setTempType(`red`)} >R</button1>
                                    <button2 onClick={() => setTempType(`Yello`)} >Y</button2>
                                    <button3 onClick={() => setTempType(`green`)} >G</button3>
                                    <button4 onClick={() => setTempType(`blue`)} >B</button4>
                                <input
                                        defaultValue={dataTitle}
                                    onChange={handleTitleChange}
                                    className='todo-input4'
                                    
                                />
                                    </div>
                                <textarea
                                    name="Text1"
                                    cols="40"
                                    rows="5"
                                    placeholder={dataDesc}
                                    onChange={handleDescChange}
                                    className='todo-input3'>
                                    {dataDesc}
                                </textarea>
                               
                                <p></p>
                                <p> </p>
                                <div>
                                    <button onClick={handleUpdate} >Save Changes</button>
                                    <button onClick={() => console.log(tempTitle)} >Assign</button>
                                    <button onClick={() => console.log(tempDesc)} >Close Ticket</button>

                                </div>
                            </ModalContent>
                            
                            <CloseModalButton
                                aria-label='Close modal'
                                onClick={() => setShowModal(prev => !prev)}
                            />
                        </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null}
            
        </>
    );
};