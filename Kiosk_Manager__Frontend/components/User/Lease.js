import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Geocode from "react-geocode";
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

export const Lease = ({ showLease, setShowLease, project }) => {
    const leaseRef = useRef();
    const [address, setAddress] = useState('');

    Geocode.setApiKey("AIzaSyBRQQbIGEsh1leSufSXKQaCRWnnWV1AD2Q");
    Geocode.setLanguage("en");
    Geocode.setRegion("us");

    Geocode.fromLatLng(project.Lat, project.Lng).then(
        response => {
            const address = response.results[0].formatted_address;
            setAddress(address)
        },
        error => {
            console.error(error);
        }
    );

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
    const [selectedDate, setSelectedDate] = useState('') 
    const [selectedEndDate, setSelectedEndDate] = useState('')
    const [size, setSize] = useState('')
    const [climate, setClimate] = useState('')
    const [code, setCode] = useState('')
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState(``)
    const [Owner, setOwner] = useState(`green`);
    const [Type, set] = useState(`green`)
   
   
    const inputRef = useRef(null);

    const handleData = (e) => {
        setClimate(e.target.value)
        setTitle(project.TempName);
        setDescription(`${Title}\n${selectedDate}\n to\n ${selectedEndDate}\n${size}\n${climate} climate control \npromo code userd:${code} `);
        
    }

    const handleSubmit = async () => {
        
        
        const response = await axios.post("https://localhost:7242/api/Users/NewTicket",
            { Type, Title, Owner, Description })
        console.log(response)
        
    };

    return (
        <>
            {showLease ? (
                <Background onClick={closeLease} ref={leaseRef}>
                    <animated.div style={animation}>
                        <ModalWrapper showModal={showLease}>
                            <ModalContent>
                                <ModalImg src={require('./project-im2.PNG')} alt='camera' />
                                <h2>{project.TempName}</h2>
                                <p>{address}</p>
                                
                                <p>Have questions? 888.888.8888</p>
                                <p>storage@support.com</p>
                                
                            </ModalContent>
                            <ModalContent>
                               
                                <h2>{project.TempName}</h2>
                                <div>{address}</div>
                                <div> Start Date:
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={date => setSelectedDate(date)}
                                    />
                                </div>
                                <div> End Date:
                                        <DatePicker
                                            selected={selectedEndDate}
                                            onChange={date => setSelectedEndDate(date)}
                                    /></div>
                                <div>Unit Size:
                                            <select onChange={e => setSize(e.target.value)} name="country" >
                                                <option value="5x5">5x5 (small)</option>
                                                <option value="5x10">5x10(small)</option>
                                                <option value="5x15">5x15 (small)</option>
                                                <option value="10x15">10x15(Medium)</option>
                                                <option value="20x25">20x20(Large)</option>
                                            </select>
                                            <div>Climate Control?
                                        <select onChange={handleData} name="climate" >
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>

                                                </select>
                                                
                                            </div>Promo Code:<div>
                                            <input
                                                placeholder='Promo'
                                                value={Title}
                                                onChange={e => setCode(e.target.value)}
                                                name='text'

                                                ref={inputRef}
                                                /></div>
                                        </div>

                                   
                                
                                <button onClick={handleSubmit}>Join Now</button>
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