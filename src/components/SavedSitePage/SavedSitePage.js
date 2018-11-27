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
            label: 'Time to cover initial solar grid investment',
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

        return (
            <div>
                <h2 className="heading" style={{marginBottom: '2vmin', paddingTop: '5vmin', fontSize: 'xx-large'}}>{site.site_name}</h2>

                <div style={{ textAlign: 'center', borderBottom: '1px solid black', paddingBottom: '10px' }}>
                    {this.state.editing ?
                        <div >
                            <TextField
                                id="date"
                                label="Funding Start Date"
                                type="date"
                                onChange={this.handleChange('fundStartDateTemp')}
                                className={classes.textField}
                                value={this.state.fundStartDateTemp ? this.state.fundStartDateTemp : new Date(startDate).toISOString().substr(0, 10)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label="Funding End Date"
                                type="date"
                                onChange={this.handleChange('fundEndDateTemp')}
                                className={classes.textField}
                                value={this.state.fundEndDateTemp ? this.state.fundEndDateTemp : new Date(endDate).toISOString().substr(0, 10)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <span>
                                <TextField
                                    label="Monthly Energy Budget"
                                    className={classes.textField}
                                    value={this.state.new_budget ? this.state.new_budget : energy_budget}
                                    onChange={this.handleChange('new_budget')}
                                    margin="normal"
                                    style={{ marginTop: '0px' }}
                                />
                                <Button color="primary" variant="outlined" onClick={() => this.setState({
                                    energy_budget: this.state.new_budget,
                                    fundStartDate: this.state.fundStartDateTemp,
                                    fundEndDate: this.state.fundEndDateTemp
                                })}>Reset Chart</Button>
                                <Button color="primary" variant="outlined" onClick={() => { this.setState({ editing: false }) }}>Save Changes</Button>
                            </span>
                        </div> :
                        <div style={{ color: 'black', display: 'inline', fontSize: 'x-large' }}>
                            <span style={{ paddingLeft: '10vmin' }}><strong style={{ color: 'blue' }}>Start Date: {(new Date(startDate).toDateString())}</strong> </span>
                            <span style={{ paddingLeft: '10vmin' }}><strong style={{ color: 'blue' }}>End Date: {(new Date(endDate)).toDateString()}</strong> </span>
                            <span style={{ paddingLeft: '10vmin' }}><strong style={{ color: 'blue' }}>Monthly Energy Budget: ${energy_budget.toLocaleString()}</strong> </span>
                            <Button color="primary" variant="outlined" size="medium"
                                onClick={() => this.setState({ editing: !this.state.editing })}>
                                Edit
                    </Button>
                        </div>}
                    {/* <h3>{this.state.editing ?
                            <span>
                                <TextField
                                    label="Monthly Energy Budget"
                                    className={classes.textField}
                                    value={this.state.new_budget ? this.state.new_budget : energy_budget}
                                    onChange={this.handleChange('new_budget')}
                                    margin="normal"
                                />
                                <Button color="primary" variant="outlined" onClick={() => this.setState({
                                    energy_budget: this.state.new_budget,
                                    fundStartDate: this.state.fundStartDateTemp,
                                    fundEndDate: this.state.fundEndDateTemp
                                })}>Reset Chart</Button>
                                <Button color="primary" variant="outlined" onClick={() => { this.setState({ editing: false }) }}>Save Changes</Button>
                            </span> :
                            <span style={{ borderBottom: '1px solid black', paddingBottom: '20px', color: 'black' }}><span><strong style={{ color: 'blue' }}>Monthly Energy Budget: ${energy_budget.toLocaleString()}</strong>

                            </span> &emsp;
                        <Button color="primary" variant="outlined" size="medium"
                                    onClick={() => this.setState({ editing: !this.state.editing })}>
                                    Edit
                    </Button> </span>}
                        </h3> */}
                </div>

                <div style={{ display: 'inline-block', width: '100%', paddingTop: '3vmin'}}>
                    <div style={{ float: 'left', width: '30%', color: 'LimeGreen', paddingLeft: '8vmin' }}>
                        {/* <h2 style={{ color: 'black', textAlign: 'left' }}>Name: {site.site_name}</h2> */}
                        {/* {this.state.editing ?
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
                                />
                                <TextField
                                    label="Funding End Date"
                                    type="date"
                                    onChange={this.handleChange('fundEndDateTemp')}
                                    className={classes.textField}
                                    value={this.state.fundEndDateTemp ? this.state.fundEndDateTemp : endDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div> :
                            <div style={{color: 'black'}}>
                                <h3>Start Date: <strong style={{ color: 'blue' }}>{(new Date(startDate).toDateString())}</strong></h3>
                                <h3>End Date: <strong style={{ color: 'blue' }}>{(new Date(endDate)).toDateString()}</strong></h3>
                            </div>}
                        <h3>{this.state.editing ?
                            <span>
                                <TextField
                                    label="Monthly Energy Budget"
                                    className={classes.textField}
                                    value={this.state.new_budget ? this.state.new_budget : energy_budget}
                                    onChange={this.handleChange('new_budget')}
                                    margin="normal"
                                />
                                <Button color="primary" variant="outlined" onClick={() => this.setState({
                                    energy_budget: this.state.new_budget,
                                    fundStartDate: this.state.fundStartDateTemp,
                                    fundEndDate: this.state.fundEndDateTemp
                                })}>Reset Chart</Button>
                                <Button color="primary" variant="outlined" onClick={() => { this.setState({ editing: false }) }}>Save Changes</Button>
                            </span> :
                            <span style={{ borderBottom: '1px solid black', paddingBottom: '20px', color: 'black' }}><span>Monthly Energy Budget: <strong style={{ color: 'blue' }}>${energy_budget.toLocaleString()}</strong>

                            </span> &emsp;
                        <Button color="primary" variant="outlined" size="medium"
                                    onClick={() => this.setState({ editing: !this.state.editing })}>
                                    Edit
                    </Button> </span>}
                        </h3> */}


                        {/* Non-editable data */}

                        <div className='leftAlign'>
                            <h2>Site Type: <strong style={{ color: 'MediumTurquoise' }}>{this.props.allSiteTypes[site.site_type_id - 1].type}</strong></h2>
                            <h3 >{site.generators[0].size &&
                                        <h3 id="generators">Generators: <strong style={{ color: 'MediumTurquoise' }}> {site.generators.map((generator, index) => <span key={index}>
                                        {generator.size} {generator.unit} </span>)}</strong>
                                            {/* <ul style={{ listStyleType: 'none', }}>
                                                <strong style={{ color: 'MediumTurquoise' }}>{site.generators.map((generator, index) => <li key={index}>
                                                    {generator.size} {generator.unit} </li>)}</strong>
                                            </ul> */}
                                        </h3>}
                                    </h3>
                            {payoff_date.isBefore(moment(endDate)) ?
                                <div>
                                    <h2>Time to pay off: <strong style={{ color: 'MediumTurquoise' }}>{parseInt(moment(payoff_date).diff(startDate, 'months'))} months</strong></h2>
                                    <h2>Total Savings: <strong style={{ color: 'MediumTurquoise' }}>${parseInt(energy_budget * project_duration - total_price).toLocaleString()}</strong></h2>
                                    <h2>Jobs Created: <strong style={{ color: 'MediumTurquoise' }}>{this.props.allSiteTypes[site.site_type_id - 1].jobs_created}</strong></h2>
                                    <h2>Total Co2 Saved: <strong style={{ color: 'MediumTurquoise' }}>{this.props.allSiteTypes[site.site_type_id - 1].co2_saved.toLocaleString()} lbs</strong></h2>
                                </div>
                                :
                                <h3 className="center" style={{ color: 'DarkRed' }}>Monthly Budget Needed To Pay Off In Time: ${parseInt(total_price / project_duration).toLocaleString()}</h3>}



                            <br />
                            {/* <div className="center">
                            <Button color="primary" variant="outlined" size="medium"
                                onClick={() => this.setState({ editing: !this.state.editing })}>
                                Edit
                            </Button>
                        </div> */}
                            <br />
                        </div>
                    </div>

                    <div style={{ width: "65%", minHeight: '50%', float: 'right' }}>
                        <Line data={{ datasets: datasets }} options={options} />
                    </div>
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