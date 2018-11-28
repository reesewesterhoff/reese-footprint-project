import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import FloatingModal from '../FloatingModal/FloatingModal';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

let start = '2014-12-30T18:06:17.762Z';
let end = '2020-01-05T18:06:17.762Z';

const styles = {
    label: {
        textTransform: 'capitalize',
        fontSize: 25,
    },
    // button: {
    //     margin: 'auto',
    //     height: '5.4vmax',
    //     width: '28vmax',
    // },
}

class Results extends Component {

    state = {
        open: false,
        contactExpertOpen: false,
        snackbarOpen: false,
        name: '',
        email: '',
        message: '',
    }

    handleChange = property => event => this.setState({ [property]: event.target.value });

    handleContactExpertToggle = () => {
        this.setState({
            ...this.state,
            contactExpertOpen: !this.state.contactExpertOpen,
            reportBugOpen: false,
        });
    };

    handleClose = () => this.setState({ ...this.state, contactExpertOpen: false, reportBugOpen: false });


    handleSubmit = property => event => {
        event.preventDefault();
        axios.post('/email', {
            content: { name: this.state.name, email: this.state.email, subject: property, message: this.state.message },
            siteName: this.props.sites.length ? this.props.sites[0].siteName : 'Not entered',
            fundStartDate: this.props.sites.length ? this.props.sites[0].fundStartDate : 'Not entered',
            fundEndDate: this.props.sites.length ? this.props.sites[0].fundEndDate : 'Not entered',
            location: this.props.sites.length ? this.props.sites[0].location : 'Not entered',
            generator: this.props.generator.length ? this.props.generator[0] : 'Not entered',
            selectedSite: this.props.selectedSite.type,
            totalDieselCost: this.props.dieselCalculation.totalDieselCost || 0,
            address: this.props.sites.length ? this.props.sites[0].address : 'Not entered',
        }).then(() => {
            this.setState({
                name: '',
                email: '',
                message: '',
                snackbarOpen: true,
                reportBugOpen: false,
                contactExpertOpen: false,
            });
        }).catch(error => console.log('Error in POST:', error));
    }


    render() {
        const { classes } = this.props;

        const datasets = [{
            label: 'Time to cover initial solar grid investment',
            data: [{ //these values will be set dynamically when user enters info. 
                //We added default start/end dates and starting price
                x: this.props.sites.length ? new Date(this.props.sites[0].fundStartDate) : start,
                y: this.props.selectedSite.total_price || 25000
            }, {
                x: this.props.dieselCalculation.payOffDate,
                y: 0
            }],
            backgroundColor: this.props.dieselCalculation.payOffInTime ? [
                'rgb(0,0,255,0.7)'
            ] : [
                    '#DC143C'
                ],
            borderColor: [
                'rgb(0,0,255)'
            ],
            borderWidth: 1,

        }, {
            label: 'Solar energy savings',
            data: [{
                x: this.props.dieselCalculation.payOffInTime ?
                    this.props.dieselCalculation.payOffDate : new Date(this.props.sites[0].fundStartDate),
                y: 0
            }, {
                x: this.props.sites.length ? this.props.sites[0].fundEndDate : end,
                y: this.props.dieselCalculation.payOffInTime ? //the savings is just (dieselCost - totalPrice)
                    this.props.dieselCalculation.totalDieselCost - this.props.selectedSite.total_price : 0
                    //if the payoff date is after the funding end date, we set the y-value to 0 as a way  
                    //of "hiding" that part of the graph 
            }],
            backgroundColor: [
                '#228b22'
            ],
            borderColor: [
                '#228b22'
            ],
            borderWidth: 1
        }, {
            label: 'Cost of Diesel',
            data: [{
                x: this.props.sites.length ? this.props.sites[0].fundStartDate : start,
                y: 0
            }, {
                x: this.props.sites.length ? this.props.sites[0].fundEndDate : end,
                y: this.props.dieselCalculation.totalDieselCost || 35000 //35000 is just a default value
            }],
            backgroundColor: [
                'rgb(128,128,128,0.7)'
            ],
            borderColor: [
                'grey'
            ],
            borderWidth: 1,
        }]

        const options = {
            scales: {
                xAxes: [{
                    type: 'time',
                    unitStepSize: 1,
                    time: {
                        unit: 'year',
                        suggestedMax: '2020-01-05T18:06:17.762Z',
                        suggestedMin: '2014-12-30T18:06:17.762Z',
                    },
                    distribution: 'linear',
                    scaleLabel: {
                        display: true,
                        labelString: 'Project Timeline',
                        fontSize: 22,
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Energy Costs',
                        fontSize: 22,
                    }
                }]
            },
        };

        return (<div>
            <h2 className="heading">Results</h2>
            {this.props.dieselCalculation.payOffInTime &&
                <div className="center">
                    <h2 style={{ color: 'LimeGreen' }}>Total Savings: ${parseInt(this.props.dieselCalculation.totalDieselCost - this.props.selectedSite.total_price).toLocaleString()}</h2>
                </div>}
            <div style={{ maxWidth: "65%", margin: "auto" }}>
                <Line data={{ datasets: datasets }} options={options} ref="linegraph" />
            </div>
            {this.props.dieselCalculation.payOffInTime ?
                <div className="center" style={{ color: 'LimeGreen' }}>
                    <h3>Time to pay off: <strong style={{ color: 'MediumTurquoise' }}>{parseInt(this.props.dieselCalculation.timeToPayOff)} months</strong></h3>
                    <h3>Total Savings: <strong style={{ color: 'MediumTurquoise' }}>${parseInt(this.props.dieselCalculation.totalDieselCost - this.props.selectedSite.total_price).toLocaleString()}</strong></h3>
                    <h3>Jobs Created: <strong style={{ color: 'MediumTurquoise' }}>{this.props.selectedSite.jobs_created}</strong></h3>
                    <h3>Total Co2 Saved: <strong style={{ color: 'MediumTurquoise' }}>{this.props.selectedSite.co2_saved.toLocaleString()} lbs</strong></h3>
                </div>
                :
                <h3 className="center" style={{ color: 'DarkRed' }}>Monthly Budget Needed To Pay Off In Time: ${parseInt(this.props.selectedSite.total_price / this.props.dieselCalculation.timeline).toLocaleString()}</h3>}
            <br />
            <div className="center">

                {this.props.user.id && this.props.selectedSite.id &&
                    <Button value="submit"
                        type="submit" variant="contained" color="primary"
                        classes={{label: classes.label}}
                        className={classes.button} onClick={this.props.addSiteToProject}>
                        <span styles={{fontSize: '40vw'}}>
                            Add to Project
                        </span>
                    </Button>}

                <FloatingModal
                    buttonText="Contact the Experts"
                    color="primary"
                    title="Please complete the following fields to send your solar estimate to a Footprint Project Representative. We will contact you soon!"
                    state={this.state}
                    modalOpen={this.state.contactExpertOpen}
                    handleModalToggle={this.handleContactExpertToggle}
                    handleChangeFor={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    handleClose={this.handleClose}
                    subject="Solar Estimate"
                    classes={{ label: classes.label }}
                />
            </div>
            <div className="subHeading">
                <p>
                    This is an estimate of the costs/benefits of using solar power at your site. There are purchase, lease, and renting options available.
                    Please click the "Contact The Experts" button to send your estimate and email address to a Footprint Project representative. We will contact
                    promptly with more details and information about how to make your project sustainable!
                </p>
            </div>

            <br />
            <br />
            <Snackbar
                open={this.state.snackbarOpen}
                message={<span id="message-id">Email Sent</span>}
                autoHideDuration={2000}
                onClose={() => this.setState({ snackbarOpen: false })}
            />
        </div>)
    }
}

Results.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    sites: state.sites,
    selectedSite: state.selectedSite,
    dieselCalculation: state.dieselCalculation,
    generator: state.generator,
    project_id: state.projectId,
    user: state.user,
});


export default withStyles(styles)(connect(mapStateToProps)(Results));