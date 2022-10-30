import React from 'react';
import User from '../components/User';
import mapStyles from './mapStyles';
import ScrollToTop from '../components/ScrollToTop';
//import { GoogleMap, GoogleApiWrapper} from 'google-maps-react' 
import { Component } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Navbar from '../components/User/Navbar';

const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
    lat: 33.448376,
    lng: -112.074036,
};

export default function UserPage() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey:"AIzaSyCLsKrS1B4g7hWrdIzMfoc3X8pEQsit-_0"
    });
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (

        <div>
           

            <User />
            
            
        </div>
    );
  }



