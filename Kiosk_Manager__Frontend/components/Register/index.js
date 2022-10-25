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
} from './RegisterElements';
import axios from 'axios'


const Register = () => {

    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [USERNAME, setUSERNAME] = useState(``)
    const [PASSWORD, setPASSWORD] = useState(``)
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post("https://localhost:7242/api/Users/registration",
            { USERNAME, PASSWORD })
    }

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to='/'>Kiosk Manager</Icon>
          <FormContent>
                      <Form onSubmit={handleSubmit}>
              <FormH1>Create your account</FormH1>
              <FormLabel htmlFor='for'>Username</FormLabel>
                          <FormInput
                              type="username"
                              id="username"
                              onChange={e => setUSERNAME(e.target.value)} 
                              required
                          />
              <FormLabel htmlFor='for'>Password</FormLabel>
                          <FormInput
                              type="Password"
                              id="Password"
                              onChange={e => setPASSWORD(e.target.value)} 
                              required
                          />
              <FormButton type='submit'>Continue</FormButton>
                          <NavBtn>
                              <NavBtnLink to='/signin'>Sign in to an existing account</NavBtnLink>
                          </NavBtn>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default Register;
