import React, { Component } from 'react';
import {Bar, Line} from 'react-chartjs-2';

class Results extends Component {

    state={
        data: {
            labels: [2015, 2016, 2017, 2018, 2019, 2020],
            datasets: [{
                label: 'Time to cover initial investment',
                data: [24000, 19000, 14000, 9000, 4000, 1000], //these values will be set dynamically when user enters info
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            },{
                label: 'Solar energy savings',
                data: [1000, 5000, 10000, 11000, 20000, 27000],
                backgroundColor: [
                    'green'
                ],
                borderColor: [
                    'green'
                ],
                borderWidth: 1
            },{
                label: 'Cost of Diesel',
                data: [5000, 12000, 19000, 26000, 33000, 40000],
                backgroundColor: [
                    'grey'
                ],
                borderColor: [
                    'grey'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }


    render() {
        return (<div>
            <h1>Results</h1>
            <Line data={this.state.data} options={this.state.options}/>
        </div>)
    }
}

export default Results;