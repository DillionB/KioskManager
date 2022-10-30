import React, { useState, useEffect } from "react";
import './User.css';
import mapStyles from './mapStyles';
import projImg from "./project-img.PNG";
import Modal from "./Modal";
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
const projects = [
    {
        title: "Business Startup",
        description: "Design & Development",
        imgUrl: projImg,
        lat: 33.508376,
        lng: -112.274036
    },
    {
        title: "Business Startup",
        description: "Design & Development",
        imgUrl: projImg,
        lat: 33.408376,
        lng: -112.169036
    },
    {
        title: "Business Startup",
        description: "Design & Development",
        imgUrl: projImg,
        lat: 33.608376,
        lng: -112.082036
    },
    {
        title: "Business Startup",
        description: "Design & Development",
        imgUrl: projImg,
        lat: 36.508376,
        lng: -111.94036
    },
    {
        title: "Business Startup",
        description: "Design & Development",
        imgUrl: projImg,
        lat: 37.508376,
        lng: -116.074036
    },
    {
        title: "Business Startup",
        description: "Design & Development",
        imgUrl: projImg,
        lat: 38.508376,
        lng: -117.074036
    },
   
];


export default function User() {
    const [userLat, setUserLat] = useState();
    const [userLong, setUserLong] = useState();
    const [map, setMap] = useState();

    function pan(mLat, mLng) {
        
        map.panTo({
            lat: mLat,
            lng: mLng,
        })

        
    }

   
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setUserLat(position.coords.latitude);
            setUserLong(position.coords.longitude);
            console.log(userLat, userLong);
        })
    }, []);   

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCLsKrS1B4g7hWrdIzMfoc3X8pEQsit-_0"
    });
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";


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

                                    /*
                        {
                          projects.map((project, index) => {
                                let lat = project.lat
                                let lng = project.lng
                                return (
                                    
                                    <Marker
                                        position={{
                                            lat: lat,

                                            lng: lng,

                                    }} 
                                    />

                                )
                            })
                        }
                        */
                                     
                                        
                                        return (
                                            
                                           console.log('')

                                        )

                                    

                                }} >
                                    {
                                        projects.map((project, index) => {

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
                zoom={12}
                center={center}
                        options={options}
                        onLoad={map=>setMap(map)}
                    >
                        <Marker position={{
                            lat: 33.508376,
                            lng: -112.074036,
                        }} onClick={() => {
                            map.panTo({
                                lat: 33.508376,
                                lng: -112.074036,
                            })
                           
                            }} />
                         
                    </GoogleMap>
                    
                </div>
            </div>
        </div>        
    );
}

