import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import React, { useState, useEffect } from "react";

function MyMap() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBRQQbIGEsh1leSufSXKQaCRWnnWV1AD2Q'
    });

    let [items, setItems] = useState(
        [
            { lat: 37.772, lng: -122.214 },
            { lat: 21.291, lng: -157.821 },
            { lat: -18.142, lng: 178.431 },
            { lat: -27.467, lng: 153.027 },
        ]
    );

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";

    return (
        <GoogleMap
            mapContainerStyle={{
                height: "400px",
                width: "100%",
            }}
            zoom={2}
            center={{ lat: 0, lng: 0 }}
        >
            {items.map((item) => (
                <Marker position={item} />
            ))}
        </GoogleMap>
    );
}

{
    items.map((item) => (
        <Marker position={{ lat: item.lat, lng: item.lng }} />))
}

export default MyMap
{
    items.map((item) => (
        <Marker position={{ lat: item.lat, lng: item.lng }} />))
}