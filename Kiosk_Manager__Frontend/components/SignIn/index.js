import { React, useRef, useState, useEffect, useContext } from 'react';
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


const SignIn = () => {

    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [USERNAME, setUSERNAME] = useState(``);
    const [PASSWORD, setPASSWORD] = useState(``);
    const [errMsg, setErrMsg] = useState(``);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg(``);
    }, [USERNAME, ])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("https://localhost:7242/api/Users/signin",
                { USERNAME, PASSWORD },
                {
                    headers: { 'Content-Type': 'applications/json' },
                    withCredentials: true
                }
            );
            console.log(response)
        } catch (err) {

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
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignIn;
