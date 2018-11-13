import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import { connect } from 'react-redux';

class Results extends Component {

    state = {
        messageToBeSent: {
            name: '',
            email: '',
            message: '',
        },
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
            }, {
                label: 'Solar energy savings',
                data: [1000, 5000, 10000, 11000, 20000, 27000],
                backgroundColor: [
                    'green'
                ],
                borderColor: [
                    'green'
                ],
                borderWidth: 1
            }, {
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

    handleChange = (property) => (event) => {
        this.setState({ messageToBeSent: { ...this.state.messageToBeSent, [property]: event.target.value } });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(`${this.state.messageToBeSent.name} is sending 
            from ${this.state.messageToBeSent.email} the following message: ${this.state.messageToBeSent.message}`);
        axios.post('/email', { content: this.state.messageToBeSent, data: this.state.data.datasets.map(dataset => dataset.data) }
        ).then((response) => {
            console.log('Response is:', response.data);
        }).catch((error) => {
            console.log('Error in POST:', error);
        })
    }

    handleCalculation = event => {
        event.preventDefault();
        this.props.dispatch({
            type: 'RUN_DIESEL_CALCULATION',
            payload: this.props.sites,
        });
    }


    render() {
        return (<div>
            <h1>Results</h1>
            <button onClick={this.handleCalculation}>Get Diesel Cost Estimate</button>
            <Line data={this.state.data} options={this.state.options} />
            <form onSubmit={this.handleSubmit}>
                <input placeholder="Name" type="text" onChange={this.handleChange('name')} />
                <input placeholder="Email" type="text" onChange={this.handleChange('email')} />
                <input placeholder="Message" type="text" onChange={this.handleChange('message')} />
                <input type="submit" value="Contact the experts" />
            </form>
        </div>)
    }
}

const mapStateToProps = state => ({
    sites: state.sites,
    dieselCalculation: state.dieselCalculation,
})

export default connect(mapStateToProps)(Results);