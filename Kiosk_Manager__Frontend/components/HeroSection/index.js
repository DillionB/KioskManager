import React, { useState, Component } from 'react';
import { Button } from '../ButtonElements';
import axios from 'axios'

import Video from '../../videos/video.mp4';
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight
} from './HeroElements';
import { useEffect } from 'react';

//break//

function HeroSection() {

  const[userData, setUserData ] = useState([]);

  

  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };

 
  return (
    <HeroContainer id='home'>
      <HeroBg>
        <VideoBg playsInline autoPlay loop muted src={Video} type='video/mp4' />
      </HeroBg>
      <HeroContent>
        <HeroH1>Kiosk Managment Made Easy</HeroH1>
        <HeroP>
                {`${userData}`}
        </HeroP>
        <HeroBtnWrapper>
          <Button
            to='signup'
            smooth={true}
            duration={500}
            spy={true}
            exact='true'
            offset={-80}
            primary='true'
            dark='true'
            onMouseEnter={onHover}
            onMouseLeave={onHover}
          >
            Get Started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
}

export default HeroSection; //export default HeroSection; //