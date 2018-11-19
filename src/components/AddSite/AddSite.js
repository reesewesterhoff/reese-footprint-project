import React, { Component } from 'react';
import { connect } from 'react-redux';
import GeneratorForm from '../GeneratorForm/GeneratorForm';
import SiteTypeList from '../SiteTypeList/SiteTypeList';
import Results from '../Results/Results';
import Map from '../Map/Map'
import Geocode from "react-geocode";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './AddSite.css'
// Set Google Maps API Key
Geocode.setApiKey("AIzaSyCZv9A4Vtnra6r04z9JnNk91zeXwX82O68");

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


class AddSite extends Component {

    state = {
        siteName: '',
        fundStartDate: '',
        fundEndDate: '',
        location: {
            lat: 0,
            lng: 0,
        },
        mapClicked: false,
        address: '',
    }

    handleClick = event => {
        this.setState({
            location: { lat: event.latLng.lat(), lng: event.latLng.lng() },
            mapClicked: true,
        });
        console.log('You clicked on', this.state.location);
        // Get Address from Lat/Long Coordinates
        Geocode.fromLatLng(this.state.location.lat, this.state.location.lng).then(
            response => {
                const address = response.results[0].formatted_address;
                console.log(address);
                this.setState({
                    address: address,
                })
            },
            error => {
                console.error(error);
                alert('There was an error, please refresh or contact us');
            }
        );
    }

    handleToggleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    handleChange = property => event => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_SITE', payload: { ...this.state, siteGenerators: this.props.generator }
        });
        // this.setState({
        //     siteName: '',
        //     fundStartDate: '',
        //     fundEndDate: '',
        //     location: {
        //         lat: 0,
        //         lng: 0,
        //     }
        // });
        // add toast
        // store inputs in redux to clear inputs after successful post
    }

    addSiteToProject = () => {
        this.props.dispatch({type: 'ADD_SITE', 
        payload: {state: this.state, 
            project_id: this.props.project_id || 1, 
            site_type_id: this.props.selectedSite.id,
            energy_budget: this.props.generator.map(obj=>parseInt(obj.monthlyCost)
                ).reduce((total,current) => total + current)}});
        if (this.props.user.id && this.props.selectedSite.id) {
            this.props.history.push('/project');
        }
    }

    render() {

        const { classes } = this.props;

        return (

            <div>
                <h2 className="heading">Transition Tool</h2>
                <div className="subHeading">
                    <h3>This tool is for users with off-grid power needs who are exploring on-site solar plus storage. 
                        Based on the length of your project, monthly power budgets and site electrical loads,
                        solar plus storage may be the right option for you!</h3>
                </div>
                <div className="siteForm">
                <br />
                    <form onSubmit={this.handleSubmit}>
                    <h4 id="siteFormHeader">Enter Site Information</h4>
                        <div>
                            <TextField
                                id="standard-name"
                                label="Site Name"
                                className={classes.textField}
                                value={this.state.siteName}
                                required
                                onChange={this.handleChange('siteName')}
                                margin="normal"
                            />
                        </div>
                        <br />
                        <TextField
                            id="date"
                            label="Funding Start Date"
                            type="date"
                            onChange={this.handleChange('fundStartDate')}
                            className={classes.textField}
                            value={this.state.fundStartDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                        <TextField
                            id="date"
                            label="Funding End Date"
                            type="date"
                            onChange={this.handleChange('fundEndDate')}
                            className={classes.textField}
                            value={this.state.fundEndDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                        <div className="map">
                            <h4>Search by Country and click on map below to set site location.</h4>
                            <h4>Latitude: {this.state.location.lat} <br></br> Longitude: {this.state.location.lng}</h4>

                            <Map
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCZv9A4Vtnra6r04z9JnNk91zeXwX82O68&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `80vmin`, width: '80vmin', margin: 'auto', }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                isMarkerShown={this.state.isMarkerShown}
                                onMarkerClick={this.handleMarkerClick}
                                handleToggleOpen={this.handleToggleOpen}
                                isOpen={this.state.isOpen}
                                onClick={this.handleClick}
                                location={this.state.location}
                                handleClick={this.handleClick}
                                mapClicked={this.state.mapClicked}
                            />
                        </div>
                        <br />
                        <br />
                        <br />
                        <GeneratorForm />
                        <br />
                        <br />
                        <Button value="submit" type="submit" variant="contained" color="primary" className={classes.button}>
                            Choose Solar Grid
                        </Button>
                        <br />
                    </form>
                </div>
                <br />
                {
                    this.props.sites.length > 0 && <SiteTypeList />
                }
                <br />
                <br />
                {
                    this.props.selectedSite.id && <Results />
                }
                <br />
                <br />
                {this.props.user.id && this.props.selectedSite.id && <Button value="submit" 
                    type="submit" variant="contained" color="primary" 
                    className={classes.button} onClick={this.addSiteToProject}>
                    Add Site to Project
                    </Button>}
            </div>

        );
    }
}

const mapStateToProps = state => ({
    sites: state.sites,
    generator: state.generator,
    selectedSite: state.selectedSite,
    project_id: state.projectId,
    user: state.user,
});

AddSite.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(AddSite));