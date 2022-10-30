
import './Admin.css';
import TicketList from './TicketList';
import TicketListArchive from './TicketListArchive';
import Navbar from './Navbar'
import Sidebar from './Sidebar';

import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
];

const data = [
    { name: 'Group A', value: 400 },
    
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const Admin = () => {
    return (
        <div> 
           
            <div>
                <Sidebar />

                    <div>
                    <Navbar />

                    

                        <div >
                        <div className='todo-app'>

                            <TicketList /> </div>
                            <PieChart className='pie' width={400} height={400}>

                                <Pie
                                    dataKey="value"
                                    data={data01}
                                    cx={190}
                                    cy={175}
                                    innerRadius={60}
                                    outerRadius={120}
                                    fill="#82ca9d"
                                />

                               

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
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    
                                    <Tooltip />
                                </PieChart>
                                <div className='panel' >
                                <TicketListArchive />
                                

                                    
                                
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>

        </div >
    );
}
export default Admin;
