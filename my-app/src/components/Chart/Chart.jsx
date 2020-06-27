import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css'

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length 
        ? (
        <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{

                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                    pointRadius: 0,
                    
                    
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true,
                    pointRadius: 0,

                }],
           }}

           option ={{
            scales: {
                xAxes: [{
                   gridLines: {
                      display: false,
                      color:'none',
                      lineWidth: 0, 
                   },
                }],
                yAxes: [{
                   gridLines: {
                      display: false,
                      color: 'rgb(250, 250, 250)',
                      lineWidth: 0 
                   }
                }]
            }
           }}
        />) : null
        

    );

    const barChart = (
        confirmed
        ? (
            <Bar 
            data = {{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: [
                        'rgba(0, 0, 255, 0.5)',
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(255, 0, 0, 0.5)',
                    ],
                    data: [confirmed.value, recovered.value, deaths.value]
                }]

            }}
            option ={{
                legend: {display: false},
                title: { display: true, text: `Current state in ${country}`},
                scales: {
                    xAxes: [{
                       gridLines: {
                          display: false,
                          color:'none',
                          gridLineWidth: 0, 
                       },
                    }],
                    yAxes: [{
                       gridLines: {
                          display: false,
                          color: 'none',
                          gridLineWidth: 0 
                       }
                    }]
                }
            }}
            
            />
        ) : null
    );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;