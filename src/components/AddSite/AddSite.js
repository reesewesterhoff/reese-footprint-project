import React, { Component } from 'react';
// connect to redux state
import { connect } from 'react-redux';
// import GeneratorForm and SiteTypeList so we can force scroll to them
import GeneratorForm from '../GeneratorForm/GeneratorForm';
import SiteTypeList from '../SiteTypeList/SiteTypeList';
// map imports
import Map from '../Map/Map'
import Geocode from "react-geocode";
// material-ui imports
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import css
import './AddSite.css';
// forced scrolling package
import scrollToComponent from 'react-scroll-to-component';
// Set Google Maps API Key
Geocode.setApiKey("AIzaSyCZv9A4Vtnra6r04z9JnNk91zeXwX82O68");

// jss styles
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

    // handles clicking on map, sets lat and long
    handleClick = event => {
        this.setState({
            location: { lat: event.latLng.lat(), lng: event.latLng.lng() },
            mapClicked: true,
        });
        // Get Address from Lat/Long Coordinates
        Geocode.fromLatLng(this.state.location.lat, this.state.location.lng).then(
            response => {
                const address = response.results[0].formatted_address;
                this.setState({
                    address: address,
                })
            },
            error => {
                console.error(error);
                alert('There was an error, please refresh or contact us');
            }
        );
    } // end handleClick

    handleToggleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    // handles changes in input fields
    handleChange = property => event => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    } // end handleChange

    // handles adding a new site
    handleSubmit = event => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_SITE', payload: { ...this.state, siteGenerators: this.props.generator }
        });
        // force scrolls to SiteTypeList
        setTimeout(() => scrollToComponent(this.siteTypeList, { offset: 0, align: 'top', duration: 750 }), 200);
    } // end handleSubmit

    // adds site to project
    addSiteToProject = () => {
        this.props.dispatch({
            type: 'ADD_SITE_TO_PROJECT',
            payload: {
                state: this.state,
                project_id: this.props.project_id,
                site_type_id: this.props.selectedSite.id,
                generators: this.props.generator,
                energy_budget: this.props.generator.map(obj => parseInt(obj.monthlyCost)
                ).reduce((total, current) => total + current)
            }
        });
        this.props.dispatch({type: 'CLEAR_FORM'});
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.sitesByProject.length > this.props.sitesByProject.length) {
            this.props.history.push('/project');
            console.log('Tried to push to project view!');
            
        }
    } // end addSiteToProject

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
                            {/* google map */}
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
                        {this.props.generator.length > 0 &&
                            <Button
                                value="submit"
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                Choose Site Type
                        </Button>}
                        <br />
                        <br />
                        <br />
                        <br />
                    </form>
                </div>
                <br />


                <br />
                <br />
                {
                    this.props.sites.length > 0 &&
                    <section className='siteTypeList' ref={(section) => { this.siteTypeList = section; }}>
                        <SiteTypeList  
                        addSiteToProject={this.addSiteToProject}
                        />
                    </section>
                }
            </div>

        );
    }
}

// access to redux state
const mapStateToProps = state => ({
    sites: state.sites,
    sitesByProject: state.sitesByProject,
    generator: state.generator,
    selectedSite: state.selectedSite,
    project_id: state.projectId,
    user: state.user,
});

// needed for jss styles
AddSite.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(AddSite));