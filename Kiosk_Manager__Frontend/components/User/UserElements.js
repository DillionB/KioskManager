import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Link as LinkR } from 'react-router-dom';

export const h1 = styled.h1`
  color: #fff;
  font-size: 48px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;
