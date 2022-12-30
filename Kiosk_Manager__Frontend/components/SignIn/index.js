import { React, useRef, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider";
import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
  Text,
  NavBtn,
  NavBtnLink
} from './SigninElements';
import axios from 'axios'
import { createContext } from 'react';




const SignIn = () => {

    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [USERNAME, setUSERNAME] = useState(``);
    const [PASSWORD, setPASSWORD] = useState(``);
    const ROLE = 'admin';
    const [errMsg, setErrMsg] = useState(``);
    const [success, setSuccess] = useState(false);
    const [activeRole, setActiveRole] = useState(`nn`);

    const history = useHistory()
    

    const UserContext = createContext([
        {
            username: ``,
            role: ``,
        },
        (obj) => obj
    ])

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg(``);
    }, [USERNAME,])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("https://localhost:7242/api/Users/signin",
                { USERNAME, PASSWORD, ROLE },
        
            );
            setActiveRole(response.data)
            console.log(activeRole)
            if (response.data === 'admin') {
                history.push('/admin')
            }
            else {
                history.push('/user')
            }
        } catch (err) {
            console.log("no role")
        }
        
    }

    const handleLoad = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("https://localhost:7242/api/Users/signin",
                { USERNAME, PASSWORD, ROLE },

            );
            setActiveRole(response.data)
            console.log(activeRole)
            if (response.data === 'admin') {
                history.push('/admin')
            }
            else {
                history.push('/user')
            }
        } catch (err) {
            console.log("no role")
        }

    }
    const handleAdmin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("https://localhost:7242/api/Users/signin",
                { USERNAME, PASSWORD, ROLE },

            );
            setActiveRole(response.data)
            console.log(activeRole)
            if (response.data === 'admin') {
                history.push('/admin')
            }
            else {
                history.push('/admin')
            }
        } catch (err) {
            console.log("no role")
        }

    }

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to='/'>Kiosk Manager</Icon>
          <FormContent>
                      <Form onSubmit={handleSubmit}>
              <FormH1>Sign in to your account</FormH1>
              <FormLabel htmlFor="username">Username</FormLabel>
                          <FormInput
                              type="username"
                              id="username"
                              ref={userRef}
                              onChange={e => setUSERNAME(e.target.value)} 
                              value={USERNAME}
                              required
                          />
              <FormLabel htmlFor="password">Password</FormLabel>
                          <FormInput
                              type="password"
                              id="Password"
                              onChange={e => setPASSWORD(e.target.value)} 
                              value={PASSWORD}
                              required
                          />
                          <FormButton type='submit'>Continue</FormButton>
                          <NavBtn>
                              <NavBtnLink to='/register'>Create a New Account</NavBtnLink>
                          </NavBtn>
                          <div>
                              <NavBtn>
                                  <NavBtnLink onClick={handleLoad}>User Demo</NavBtnLink>
                                  <NavBtn>
                                      <NavBtnLink onClick={handleAdmin} >Admin Demo</NavBtnLink>
                                  </NavBtn>
                                </NavBtn>
                          
                          </div>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignIn;
