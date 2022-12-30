
import './Admin.css';
import TicketList from './TicketList';
import TicketListArchive from './TicketListArchive';
import Navbar from './Navbar'
import Sidebar from './Sidebar';
import pieChart from './PieChart'
import { ProjectCard } from "./ProjectCard";
import React, { PureComponent, useState, useEffect, ScrollView } from 'react';
import { PieChart, Pie, Sector, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import {

    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import mapStyles from './mapStyles';
import axios from 'axios';
import ReactS3 from "react-s3";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import LocationSearch from './locationSearch'
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';

const mapContainerStyle = {
    height: "50vh",
    width: "50vw",
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


const Admin = () => {

    let [greenCount, setGreenCount] = useState(0);
    let [blueCount, setBlueCount] = useState(0);
    let [yellowCount, setYellowCount] = useState(0);
    let [redCount, setRedCount] = useState(0);
    let [fileUpload, setFileUpload] = useState();
    let [fileUploadName, setFileUploadName] = useState('');
    const [gAddress, setgAddress] = useState('')
    const [coordinates, setCoordinates] = useState('')
    let [data01, setData01] = useState([
        { name: 'Green', value: greenCount, fill: '#64c943' },
        { name: 'Blue', value: blueCount, fill: '#0053e2' },
        { name: 'Yellow', value: yellowCount, fill: '#ffff00' },
        { name: 'Red', value: redCount, fill: '#ff0000' },

    ]);
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    useEffect(() => {
        handlePieLoad();
    }, [])



    const [map, setMap] = useState();
    const handlePieLoad = async () => {
        const response = await axios.get("https://localhost:7242/api/Users/GetTickets",)
        const types = response.data;

        let i = 0

        for (i - 0; i <= types.length; i++) {
            if (types[i].Type === 'green     ') {
                setGreenCount(greenCount++)
                setBlueCount(blueCount)
                setYellowCount(yellowCount)
                setRedCount(redCount)
                console.log(`green`+ greenCount)

            } else {
                if (types[i].Type === 'blue      ') {
                    setBlueCount(blueCount++)
                    console.log(`blue` + blueCount)

                } else {
                    if (types[i].Type === 'Yello     ') {
                        setYellowCount(yellowCount++)
                        console.log(`yellow` + yellowCount)
                    } else {
                        if (types[i].Type === 'red       ') {
                            setRedCount(redCount++)
                            console.log(`red` + redCount)
                        } else {
                            console.log('error')
                        }
                        
                    }
                }
            }
            setData01([
                { name: 'Green', value: greenCount, fill: '#64c943' },
                { name: 'Blue', value: blueCount, fill: '#0053e2' },
                { name: 'Yellow', value: yellowCount, fill: '#ffff00' },
                { name: 'Red', value: redCount, fill: '#ff0000' },

            ])
        }
    };
    function pan(mLat, mLng) {

        map.panTo({
            lat: mLat,
            lng: mLng,
        })


    }
    let [projectsArr, setProjectsArr] = useState([])

    useEffect(() => {
        handleLoad();
    }, [])

    const handleLoad = async () => {
        const response = await axios.get("https://localhost:7242/api/Users/GetLocations",)



        setProjectsArr(response.data)

        console.log(response.data)
    }

    var AWS = require('aws-sdk');

    AWS.config.update({
        bucketName: 'kiosk-manager-storage',
        region: 'us-west-2',
        accessKeyId: 'AKIAZPKBY6WGDYD67TR6',
        secretAccessKey: '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',
    });

    const s3 = new AWS.S3();
    let params = { Bucket: 'kiosk-manager-storage', Key: fileUploadName, Body: fileUpload }
    const handleUpload = () => {
        s3.upload(params, function (err, data) {

            if (err) {

                console.log(err)

            } else {

                console.log("Successfully uploaded data to myBucket/myKey");

            }
            window.location.reload();
        })
            
    }
    let TempName = 'Default Name'
    let TempDesc = 'Default Description'
    let tempAddy = 'Default Address'
    let tempCode = 'promo'
    let renewal = 'no'
    let insurance = 'yes'
    let leaseStart = ''
    let leaseEnd = ''
    let fxf = 0
    let fxt = 0
    let fxft = 0
    let txt = 0
    let txft = 0
    let txtw = 0
    let txtf = 0
    let txth = 0
    let car = 0
    const handleNameChange = t => {
        TempName = t.target.value;
        console.log(TempName)
    };
    const handleDescChange = t => {
        TempDesc = t.target.value;
        console.log(TempDesc)
    };
    const handleAddyChange = t => {
        tempAddy = t.target.value;
        console.log(tempAddy)
    };
    const handleCodeChange = t => {
        tempCode = t.target.value;
        console.log(tempCode)
    };
    const handleRenewalChange = t => {
        renewal = t.target.value;
        console.log(renewal)
    };
    const handleInsuranceChange = t => {
        insurance = t.target.value;
        console.log(insurance)
    };
    const handleFxfChange = t => {
        fxf = t.target.value;
        console.log(fxf)
    };
    const handleFxtChange = t => {
        fxt = t.target.value;
        console.log(fxt)
    };
    const handleFxftChange = t => {
        fxft = t.target.value;
        console.log(fxft)
    };
    const handleTxtChange = t => {
        txt = t.target.value;
        console.log(txt)
    };
    const handleTxftChange = t => {
        txft = t.target.value;
        console.log(txft)
    };
    const handleTxtwChange = t => {
        txtw = t.target.value;
        console.log(txtw)
    };
    const handleTxtfChange = t => {
        txtf = t.target.value;
        console.log(txtf)
    };
    const handleTxthChange = t => {
        txth = t.target.value;
        console.log(txth)
    };
    const handleCarChange = t => {
        car = t.target.value;
        console.log(car)
    };

    const data = [
        { name: 'Group A', value: 400 },

    ];
    const COLORS = ['#64c943', '#ff0000', '#0053e2', '#ffff00'];
    const COLORS2 = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBRQQbIGEsh1leSufSXKQaCRWnnWV1AD2Q"
    });
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("https://localhost:7242/api/Users/NewArchive",
            {  })
    };

    

    const handlegAddressChange = gAddress => {
        this.setState({ gAddress });
    };

   /* const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);

        const ll = await getLatLng(results[0])
        console.log(ll)
        setgAddress(value)
        setCoordinates(ll)
    }
    */
    const handleLocationSubmit = async (value) => {
        
            const results = await geocodeByAddress(value);

        const ll = await getLatLng(results[0])
        const lat = ll.lat
        const lng = ll.lng
       
        console.log(handleUpload())
                
        await axios.post("https://localhost:7242/api/Users/NewLocation", { TempName, TempDesc, fileUploadName, lat, lng, tempCode, leaseStart, leaseEnd, fxf, fxt, fxft, txt, txft, txtw, txtf, txtw, car, insurance })

            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        
    };

    return (

        <div  > 
           
            <div >
                <Sidebar />

                    <div >
                    <Navbar />

                   
                    <div >

                        <div className='Todo-app'>
                            <TicketList />
                        </div>
                        
                            <PieChart className='pie' width={400} height={400}>
                           
                                <Pie
                                    dataKey="value"
                                    data={data01}
                                    cx={190}
                                    cy={175}
                                    innerRadius={60}
                                    outerRadius={120}
                                

                                >
                                
                            </Pie>
                            
                                <Tooltip />
                        </PieChart>
                        
                            <div >

                            <PieChart className='pie2' width={400} height={400}>
                                
                                    <Pie
                                        data={data}
                                        cx={120}
                                        cy={200}
                                        innerRadius={80}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    
                                    <Tooltip />
                            </PieChart>

                            <div className='panel' >

                                <TicketListArchive />
                               
                                

                                

                              
                                    
                                
                            </div>
                            <div  className='invMan'></div>
                            <h5>Inventory Managment</h5>
                            <div className='mapback'> 
                                
                                <div className='LocationForm'>
                                    
                                    <div> <h7>Add New Location</h7>
                                        <div > Location Image <input className='upload' type='file' onInput={(event) => { setFileUpload(event.currentTarget.files[0]); setFileUploadName(event.currentTarget.files[0].name) } }></input></div>
                                        Location Name
                                        
                                    <input
                                            name='Name'
                                            className='locTitle-input'
                                            onChange={handleNameChange}
                                           
                                    />  
                                    
                                    <div>Location Description</div>
                                    <div> 
                                        <h6></h6>
                                            <textarea
                                                name="Text1"
                                                cols="40"
                                                rows="5"
                                                className='locDesc-input'
                                                onChange={handleDescChange}> 
                                            </textarea>
                                    </div>
                                    <div>
                                            Location Address 
                                            <input
                                                name='text'
                                                className='locTitle-input'
                                                onChange={handleAddyChange}
                                                
                                                type='address'
                                            /> 
                                            
                                     
                                    </div>
                                    <div>
                                        Promo Codes
                                        <input
                                                name='text'
                                                className='locTitle-input'
                                                onChange={handleCodeChange}
                                        />
                                    </div>
                                    <div>
                                        Auto Renewal? 
                                            <input type='radio' value='Yes' name='Yes' onChange={handleRenewalChange}/> Yes
                                            <input type='radio' value='No' name='No' onChange={handleRenewalChange}/> No
                                    </div>
                                    <div>
                                        Insurance?
                                            <input type='radio' value='Yes' name='Yes' onChange={handleInsuranceChange} /> Yes
                                            <input type='radio' value='No' name='No' onChange={handleInsuranceChange} /> No
                                    </div>
                                    <div>
                                        5x5
                                            <select onChange={handleFxfChange}>
                                            <option value='0'>0</option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </select>
                                        10x10
                                            <select onChange={handleTxtChange}>
                                            <option value='0'>0</option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </select>
                                        10x25
                                            <select onChange={handleTxtfChange}>
                                            <option value='0'>0</option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </select>
                                    </div>
                                    <div>
                                        5x10
                                            <select onChange={handleFxtChange}>
                                            <option value='0'>0</option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </select>
                                        10x15
                                            <select onChange={handleTxftChange}>
                                            <option value='0'>0</option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </select>
                                        10x30
                                            <select onChange={handleTxthChange}>
                                            <option value='0'>0</option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </select>
                                    </div>
                                    <div>
                                        5x15
                                            <select onChange={handleFxftChange}>
                                            <option value='0'>0</option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </select>
                                        10x20
                                            <select onChange={handleTxtwChange}>
                                            <option value='0'>0</option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </select>
                                        Car
                                            <select onChange={handleCarChange}>
                                            <option value='0'>0</option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </select>
                                    </div>
                                        <button onClick={()=>handleLocationSubmit(tempAddy)}>Submit</button>
                                    </div>
                                    
                                     
                            </div>
                            <div className="map2">

                                <GoogleMap
                                    mapContainerStyle={mapContainerStyle}
                                    zoom={13}
                                    center={center}
                                    options={options}
                                    onLoad={map => setMap(map)}


                                >
                                        {projectsArr && projectsArr.length > 0 && projectsArr.map((project, index) => {
                                            console.log(project.Lat);

                                            return <Marker  key={index} position={{ lat: project.Lat, lng: project.Lng }} />
                                        })}

                                    </GoogleMap>
                                   
                                </div>

                            </div> 
                            
                        </div>
                    </div>
                    
                </div>
                
            </div>
            <div className='locations'>
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
            </div>
        </div >

    );
}
export default Admin;