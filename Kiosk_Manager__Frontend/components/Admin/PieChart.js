import React from "react";
import { PieChart, Pie, Sector, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

import axios from 'axios'



function pieChart() {
    let greenCount = 1;
    let blueCount = 1;
    let yellowCount = 1;
    let redCount = 1;

    const data01 = [
        { name: 'Green', value: greenCount },
        { name: 'Blue', value: blueCount },
        { name: 'Yellow', value: yellowCount },
        { name: 'Red', value: redCount },

    ];
    const handlePieLoad = async () => {
        const response = await axios.get("https://localhost:7242/api/Users/GetTickets",)
        const types = response.data;

        let i = 0

        for (i - 0; i <= types.length; i++) {
            if (types[i].Type === 'green     ') {
                greenCount++

            } else {
                if (types[i].Type === 'blue      ') {
                    blueCount++

                } else {
                    if (types[i].Type === 'Yello     ') {
                        yellowCount++

                    } else {
                        if (types[i].Type === 'red       ') {
                            redCount++
                        } else {
                            console.log('error')
                        }
                    }
                }
            }
        }
    };
   // handlePieLoad()


    const data = [
        { name: 'Group A', value: 400 },

    ];
    const COLORS = ['#64c943', '#ff0000', '#0053e2', '#ffff00'];
    const COLORS2 = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
        <div >
                            <PieChart className='pie' width={400} height={400}>

                                <Pie
                                    dataKey="value"
                                    data={data01}
                                    cx={190}
                                    cy={175}
                                    innerRadius={60}
                                    outerRadius={120}
                                fill="#82ca9d"

                                >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
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
            </div>
        </div>
    );
}
export default pieChart