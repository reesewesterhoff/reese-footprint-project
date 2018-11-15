import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
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
        datasets: [{
            label: 'Time to cover initial investment',
            data: [{ //these values will be set dynamically when user enters info
                x: this.props.state.sites.length ? new Date(this.props.state.sites[0].fundStartDate) : start,
                y: this.props.state.selectedSite.total_price || 25000
            }, {
                x: this.props.state.sites.length ? 
                    new Date( Math.max(new Date(this.props.state.sites[0].fundEndDate).getTime(),
                        new Date(this.props.state.sites[0].fundStartDate).getTime() + 
                        this.props.state.selectedSite.total_price/(this.props.state.generator[0].monthlyCost)*2592000*1000)) : end,
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
                x:  // get fundStartDate in milliseconds, then add the time it takes to recover initial investment
                        new Date(this.props.state.sites[0].fundStartDate).getTime() 
                    //2592000 is the number of seconds per month
                    + this.props.state.selectedSite.total_price/(this.props.state.generator[0].monthlyCost)*2592000*1000 < 
                        new Date(this.props.state.sites[0].fundEndDate).getTime() ?
                    new Date(
                        // get fundStartDate in milliseconds, then add the time it takes to recover initial investment
                            new Date(this.props.state.sites[0].fundStartDate).getTime() 
                        //2592000 is the number of seconds per month
                        + this.props.state.selectedSite.total_price/(this.props.state.generator[0].monthlyCost)*2592000*1000 ) : new Date(this.props.state.sites[0].fundStartDate),
                y: 0
            }, {
                x: this.props.state.sites.length ? this.props.state.sites[0].fundEndDate : end,
                y:  new Date(this.props.state.sites[0].fundStartDate).getTime() 
                //2592000 is the number of seconds per month
                + this.props.state.selectedSite.total_price/(this.props.state.generator[0].monthlyCost)*2592000*1000 < 
                    new Date(this.props.state.sites[0].fundEndDate).getTime() ? 
                    this.props.state.dieselCalculation.totalDieselCost - this.props.state.selectedSite.total_price : 0
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
        }],
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

    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/email', {
            content: { name: this.state.name, email: this.state.email, message: this.state.message },
            siteName: this.props.state.sites[0].siteName,
            fundStartDate: this.props.state.sites[0].fundStartDate,
            fundEndDate: this.props.state.sites[0].fundEndDate,
            location: this.props.state.sites[0].location,
            generator: this.props.state.generator[0],
            selectedSite: this.props.state.selectedSite.type,
            totalDieselCost: this.props.state.dieselCalculation.totalDieselCost,
            address: this.props.state.sites[0].address
        }
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



    render() {
        return (<div>
            <h2 className="heading">Results</h2>
            <Line data={{ datasets: this.state.datasets }} options={this.state.options} />

            <form onSubmit={this.handleSubmit}>
                <TextField required placeholder="Name" type="text" onChange={this.handleChange('name')} value={this.state.name} />
                <TextField required placeholder="Email" type="text" onChange={this.handleChange('email')} value={this.state.email} />
                <TextField placeholder="Message" type="text" onChange={this.handleChange('message')} value={this.state.message} />
                <input type="submit" value="Contact the experts" />
            </form>
            {/* <pre>{JSON.stringify(this.props.state, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
        </div>)
    }
}

const mapStateToProps = (state) => {
    return { state };
}


export default connect(mapStateToProps)(Results);