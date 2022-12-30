import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
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

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #161a2b;
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

export const Lease = ({ showLease, setShowLease }) => {
    const leaseRef = useRef();

    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: showLease ? 1 : 0,
        transform: showLease ? `translateY(0%)` : `translateY(-100%)`
    });

    const closeLease = e => {
        if (leaseRef.current === e.target) {
            setShowLease(false);
        }
    };

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showLease) {
                setShowLease(false);
                console.log('I pressed');
            }
        },
        [setShowLease, showLease]
    );

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );
    const [selectedDate, setSelectedDate] = useState(null) 
    const [selectedEndDate, setSelectedEndDate] = useState(null)
   
    const [Title, setTitle] = useState(``);
    const inputRef = useRef(null);
    return (
        <>
            {showLease ? (
                <Background onClick={closeLease} ref={leaseRef}>
                    <animated.div style={animation}>
                        <ModalWrapper showModal={showLease}>
                            <ModalContent>
                                <ModalImg src={require('./project-im2.PNG')} alt='camera' />
                                <h2>Thunderbird Storage</h2>
                                <p>13801 N 19th Ave, Phoenix, AZ 85023</p>
                                
                                <p>Have questions? 888.888.8888</p>
                                <p>storage@support.com</p>
                                
                            </ModalContent>
                            <ModalContent>
                               
                                <h2>Thunderbird Storage</h2>
                                <p>13801 N 19th Ave, Phoenix, AZ 85023</p>
                                <p> Start Date:
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={date => setSelectedDate(date)}
                                    />
                                    <p> End Date:
                                        <DatePicker
                                            selected={selectedEndDate}
                                            onChange={date => setSelectedEndDate(date)}
                                        /><p>Unit Size:
                                            <select onChange={onchange} name="country" >
                                                <option value="5x5">5x5 (small)</option>
                                                <option value="5x10">5x10(small)</option>
                                                <option value="5x15">5x15 (small)</option>
                                                <option value="10x15">10x15(Medium)</option>
                                                <option value="20x25">20x20(Large)</option>
                                            </select>
                                            <p>Climate Control?
                                                <select onChange={onchange} name="climate" >
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>

                                                </select>
                                                
                                            </p>Promo Code:<p>
                                            <input
                                                placeholder='Promo'
                                                value={Title}
                                                onChange={e => setTitle(e.target.value)}
                                                name='text'

                                                ref={inputRef}
                                                /></p>
                                        </p>

                                    </p>
                                </p>
                                <button onClick={() => setShowLease(prev => !prev)}>Join Now</button>
                            </ModalContent>
                            <CloseModalButton
                                aria-label='Close modal'
                                onClick={() => setShowLease(prev => !prev)}
                            />
                        </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null}
        </>
    );
};