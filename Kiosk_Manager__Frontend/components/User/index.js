import React, { useRef, useState, useEffect } from "react";
import './User.css';
import mapStyles from './mapStyles';
import projIm1 from "./project-im1.PNG";
import projIm2 from "./project-im2.PNG";
import projIm3 from "./project-im3.PNG";
import projIm4 from "./project-im4.PNG";
import { Modal } from './Modal'
import { ProjectCard } from "./ProjectCard";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
//import { GoogleMap, GoogleApiWrapper} from 'google-maps-react' 
import { Component } from 'react';
import {

    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import Navbar from './Navbar';
import axios from 'axios';


const mapContainerStyle = {
    height: "100vh",
    width: "80vw",
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};
let mLat = 33.508376;
let mLng = -112.074036;
let center = {
    lat: mLat,
    lng: mLng,
};







export default function User() {
    const [userLat, setUserLat] = useState();
    const [userLong, setUserLong] = useState();
    const [map, setMap] = useState();
    const [showModal, setShowModal] = useState(false);
    const [modalProject, setModalProject] = useState('');
    const [Mproject, setMproject] = useState('');
    const [selectedMarker, setSelectedMarker] = useState(null);

    

    let [projectsArr, setProjectsArr] = useState([
        {
            Id: 0,
            Title: "Business Startup",
            Description: "Design & Development",
            imgUrl: projIm1,
            Lat: 33.508376,
            Lng: -112.274036
        },
        {
            Id: 1,
            Title: "Business Startup",
            Description: "Design & Development",
            imgUrl: projIm2,
            Lat: 33.408376,
            Lng: -112.169036
        },
        {
            Id: 2,
            Title: "Thunderbird 19th",
            Description: "Climate Controlled- Indoors",
            imgUrl: projIm3,
            Lat: 33.608376,
            Lng: -112.082036
        },
        {
            Id: 3,
            Title: "Business Startup",
            Description: "Design & Development",
            imgUrl: projIm4,
            Lat: 36.508376,
            Lng: -111.974036
        },
        {
            Id: 4,
            Title: "Business Startup",
            Description: "Design & Development",
            imgUrl: projIm1,
            Lat: 37.508376,
            Lng: -116.074036
        },
        {
            Id: 5,
            Title: "Business Startup",
            Description: "Design & Development",
            imgUrl: projIm1,
            Lat: 38.508376,
            Lng: -117.074036
        },

    ]);

   // let Mproject = '';

    let items = useState([
        { lat: 37.772, lng: -122.214 },
        { lat: 21.291, lng: -157.821 },
        { lat: -18.142, lng: 178.431 },
        { lat: -27.467, lng: 153.027 },
    ])[0];

    let setItems = useState([
        
    ])[1];

    const openModal = (project) => {
       
        setShowModal(prev => !prev);
        setMproject(project)
       
    };
    useEffect(() => {
        handleLoad();
    }, [])
    
    const handleLoad = async () => {
        const response = await axios.get("https://localhost:7242/api/Users/GetLocations",)

        
        
      setProjectsArr(response.data)
       
        
    }
    
    
    
  
    function pan(mLat, mLng) {
        
        map.panTo({
            lat: mLat,
            lng: mLng,
        })

        
    }

   
    
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBRQQbIGEsh1leSufSXKQaCRWnnWV1AD2Q"
    });
    if (loadError) return "Error";
    
    if (!isLoaded) return <div>Loading...</div>;
    
    return ( 
        <div className="Nav"><Navbar />
        <div className="container">
                
                
            <div className="controls">
                    <Tab.Container className="project" id="projects-tabs" >
                        <h1>Available Kiosks
                        </h1>
                        <Tab.Content  >
                            <Tab.Pane eventKey="first">
                                <Row onClick={() => {
                                    //console.log(pan(38.508376,-117.074036 ))
                                    
                                        return (
                                            
                                           console.log('')

                                        )

                                }} >
                                    {
                                        projectsArr.map((project, index) => {

                                            return (

                                                <ProjectCard 
                                                    pan={pan}
                                                    key={index}
                                                    {...project}

                                                />

                                            )
                                        })
                                    }
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
                    <div className="map">

            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={center}
                        options={options}
                        onLoad={map=>setMap(map)}
                    >

                        {projectsArr && projectsArr.length > 0 && projectsArr.map((project, index) => {
                            console.log(project.Lat);
                            
                            return <Marker onClick={() => openModal(project)} key={index} position={{ lat: project.Lat, lng: project.Lng }} />
                        })}

                        
                        
                        <Modal showModal={showModal} setShowModal={setShowModal} project={Mproject} />
                    </GoogleMap>
                    
                </div>
            </div>
        </div>        
    );
}

