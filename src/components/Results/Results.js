import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';


let start = '2014-12-30T18:06:17.762Z';
let end = '2020-01-05T18:06:17.762Z';


class Results extends Component {

    state = {
        name: '',
        email: '',
        message: '',
        data: {
            // labels: [2015, 2016, 2017, 2018, 2019, 2020],
            datasets: [{
                label: 'Time to cover initial investment',
                data: [{ //these values will be set dynamically when user enters info
                    x: this.props.state.sites.length ? new Date(this.props.state.sites[0].fundStartDate) : start,
                    y: this.props.state.selectedSite.total_price || 25000
                }, {
                    x: this.props.state.sites.length ? new Date(this.props.state.sites[0].fundEndDate) : end,
                    y: 0
                }],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],

                borderWidth: 1,

            }, {
                label: 'Solar energy savings',
                data: [{
                    x: this.props.state.sites.length ? this.props.state.sites[0].fundStartDate : start,
                    y: 1000
                }, {
                    x: this.props.state.sites.length ? this.props.state.sites[0].fundEndDate : end,
                    y: 27000
                }],
                backgroundColor: [
                    'rgba(100, 100, 300, 0.4)'
                ],
                borderColor: [
                    'green'
                ],
                borderWidth: 1
            }, {
                label: 'Cost of Diesel',
                data: [{
                    x: this.props.state.sites.length ? this.props.state.sites[0].fundStartDate : start,
                    y: 0
                }, {
                    x: this.props.state.sites.length ? this.props.state.sites[0].fundEndDate : end,

                    y: this.props.state.dieselCalculation.totalDieselCost || 35000

                }],
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
                xAxes: [{
                    type: 'time',
                    unitStepSize: 1,
                    time: {
                        unit: 'year',
                        suggestedMax: '2020-01-05T18:06:17.762Z',
                        suggestedMin: '2014-12-30T18:06:17.762Z',
                    },
                    distribution: 'linear'
                }],
            }
        }
    }

    handleChange = (property) => (event) => {
        this.setState({ [property]: event.target.value });
        console.log('event', event.target.value);

    }

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log(`${this.state.messageToBeSent.name} is sending 
        //     from ${this.state.messageToBeSent.email} the following message: ${this.state.messageToBeSent.message}`);
        axios.post('/email', { content: { name: this.state.name, email: this.state.email, message: this.state.message }, data: this.state.data.datasets.map(dataset => dataset.data) }
        ).then((response) => {
            console.log('Response is:', response.data);
            this.setState({
                name: '',
                email: '',
                message: '',
            });
        }).catch((error) => {
            console.log('Error in POST:', error);
        })
    }

    // handleCalculation = event => {
    //     event.preventDefault();
    //     this.props.dispatch({
    //         type: 'RUN_DIESEL_CALCULATION',
    //         payload: this.props.state.sites,
    //     });
    // }


    render() {
        return (<div>
            <h2 className="heading">Results</h2>
            <Line data={this.state.data} options={this.state.options} />


            <form onSubmit={this.handleSubmit}>
                <TextField required placeholder="Name" type="text" onChange={this.handleChange('name')} value={this.state.name} />
                <TextField required placeholder="Email" type="text" onChange={this.handleChange('email')} value={this.state.email} />
                <TextField placeholder="Message" type="text" onChange={this.handleChange('message')} value={this.state.message} />
                <input type="submit" value="Contact the experts" />
            </form>
            {/* <pre>{JSON.stringify(this.props.state, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(this.state.messageToBeSent, null, 2)}</pre> */}
        </div>)
    }
}

const mapStateToProps = (state) => {
    return { state };
}


export default connect(mapStateToProps)(Results);