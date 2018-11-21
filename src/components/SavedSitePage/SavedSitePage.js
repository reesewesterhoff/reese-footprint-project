import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class SavedSitePage extends Component {

    state = {
        energy_budget: this.props.energy_budget,
        editing: false,
        new_budget: 0,
        fundStartDate: '',
        fundEndDate: '',
        siteName: '',
        fundStartDateTemp: '',
        fundEndDateTemp: '',
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.energy_budget === 0) {
            this.setState({ energy_budget: 0 });
        }
    }

    handleChange = property => (event) => {
        this.setState({ [property]: event.target.value });
    }

    render() {
        const { classes } = this.props;

        const site = this.props.sites[this.props.index]
        const total_price = this.props.allSiteTypes[site.site_type_id - 1].total_price;
        const energy_budget = this.state.energy_budget ? this.state.energy_budget : site.energy_budget;
        const startDate = this.state.fundStartDate || site.start_date;
        const endDate = this.state.fundEndDate || site.end_date;
        const payoff_date = (moment(startDate)).add(
            total_price / energy_budget, 'months');
        const project_duration = (moment(endDate)).diff(moment(startDate), 'months');

        const datasets = [{
            label: 'Time to cover initial investment',
            data: [{
                x: moment(startDate),
                y: total_price
            }, {
                x: payoff_date,
                y: 0
            }],
            backgroundColor: payoff_date.isBefore(moment(endDate)) ? [
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
                x: payoff_date.isBefore(moment(endDate)) ?
                    payoff_date : moment(startDate),
                y: 0
            }, {
                x: moment(endDate),
                y: payoff_date.isBefore(moment(endDate)) ?
                    energy_budget * project_duration - total_price : 0
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
                x: startDate,
                y: 0
            }, {
                x: endDate,
                y: energy_budget * project_duration,
            }],
            backgroundColor: [
                'rgb(128,128,128,0.7)'
            ],
            borderColor: [
                'grey'
            ],
            borderWidth: 1
        }
        ]

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
                        labelString: 'Project Timeline'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Energy Costs'
                    }
                }]
            },
        };
        return (
            <div>
                <h1>Saved Site</h1>
                <h2>Name: {site.site_name}</h2>
                {this.state.editing ?
                    <div>
                        <TextField
                            id="date"
                            label="Funding Start Date"
                            type="date"
                            onChange={this.handleChange('fundStartDateTemp')}
                            className={classes.textField}
                            value={this.state.fundStartDateTemp}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                        <TextField
                            label="Funding End Date"
                            type="date"
                            onChange={this.handleChange('fundEndDateTemp')}
                            className={classes.textField}
                            value={this.state.fundEndDateTemp}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                    </div> :
                    <div>
                        <Button color="primary" onClick={() => this.setState({ editing: !this.state.editing })}>
                            Edit</Button>
                        <h4>Start Date: {(new Date(startDate).toDateString())}</h4>
                        <h4>End Date: {(new Date(endDate)).toDateString()}</h4>
                    </div>}

                <h4>{this.state.editing ?
                    <span>
                        <TextField
                            label="Monthly Energy Budget"
                            className={classes.textField}
                            value={this.state.new_budget}
                            required
                            onChange={this.handleChange('new_budget')}
                            margin="normal"
                        />
                        <Button color="primary" onClick={() => this.setState({
                            energy_budget: this.state.new_budget,
                            fundStartDate: this.state.fundStartDateTemp,
                            fundEndDate: this.state.fundEndDateTemp
                        })}>Reset Chart</Button>
                        <Button color="primary" onClick={() => { this.setState({ editing: false }) }}>Save Changes</Button>
                    </span> :
                    <span>Monthly Energy Budget: ${energy_budget.toLocaleString()}
                    </span>}
                </h4>
                <h4>Site Type: {this.props.allSiteTypes[site.site_type_id - 1].type}</h4>
                <h4>{site.generators[0].size &&
                    <div>Generators:
                    <ul>
                            {site.generators.map((generator, index) => <li key={index}>
                                {generator.size} {generator.unit} at ${generator.fuel_cost.toLocaleString()}/month</li>)}
                        </ul>
                    </div>}
                </h4>
                <div style={{ maxWidth: "75%", margin: "auto" }}>
                    <Line data={{ datasets: datasets }} options={options} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    sites: state.sitesByProject,
    siteTypes: state.siteTypes,
    allSiteTypes: state.allSiteTypes,
    dieselCalculation: state.dieselCalculation,
    generator: state.generator
});

SavedSitePage.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(connect(mapStateToProps)(SavedSitePage));