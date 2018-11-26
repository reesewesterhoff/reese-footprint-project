import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import SavedSitePage from '../SavedSitePage/SavedSitePage';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RouterIcon from '@material-ui/icons/Router';
import WavesIcon from '@material-ui/icons/Waves';
import SecurityIcon from '@material-ui/icons/Security';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
import './ProjectPage.css'
import SitesMap from '../SitesMap/SitesMap'


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: 'auto',
    },
    cardDiv: {
        marginTop: '5%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    card: {
        paddingTop: '2vmin',
        width: '30vmin',
        height: '37vmin',
        margin: 10,
        textAlign: 'center',
    },

    icon: {
        width: '10vmin',
        height: '10vmin',
    }
});

class ProjectPage extends Component {

    state = {
        currentIndex: -1,
        icon: '',
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ALL_SITE_TYPES' });
        this.setState({
            icon: this.chooseIcon('Health'),
        });
    }

    selectSite = (index) => {
        console.log('index:', index);
        this.setState({
            currentIndex: index,
        })

    }

    chooseIcon = iconCategory => {
        switch (iconCategory) {
            case 'Health':
                return <LocalHospitalIcon style={{ width: "10vmin", height: "10vmin" }} />
            case 'Water':
                return <WavesIcon style={{ width: "10vmin", height: "10vmin" }} />
            case 'Comms':
                return <RouterIcon style={{ width: "10vmin", height: "10vmin" }} />
            case 'Ops':
                return <SecurityIcon style={{ width: "10vmin", height: "10vmin" }} />
            case 'Shelter':
                return <HomeIcon style={{ width: "10vmin", height: "10vmin" }} />
            case 'Food':
                return <RestaurantIcon style={{ width: "10vmin", height: "10vmin" }} />
            case 'Admin':
                return <BusinessCenterIcon style={{ width: "10vmin", height: "10vmin" }} />
            case 'Logs':
                return <StoreIcon style={{ width: "10vmin", height: "10vmin" }} />
            default:
                return null;
        }
    }

    handleAddSite = () => {
        this.props.history.push('/add_site')
    }

    render() {


        const { classes } = this.props;

        return (

            <div>
                <div>
                    {!this.props.project.length ? <p>loading...</p> :
                        <div>
                            <h1 className="heading">{this.props.project[0].name}

                                <pre>
                                    <Button
                                        onClick={this.handleAddSite}
                                        size="medium"
                                        variant="contained"
                                        color="primary">
                                        Add Site
                          </Button>


                                </pre>

                            </h1>



                        </div>}

                    {!this.props.sitesByProject.length ? <h2>Add a site to get started!</h2> :
                    <div>
                        <div className={classes.cardDiv}>

                            {this.props.sitesByProject.map((site, index) =>

                                <Card className={classes.card} key={index}>

                                    <CardContent>
                                        <Typography variant="h4">
                                            {
                                                this.chooseIcon(
                                                    this.props.allSiteTypes[(site.site_type_id - 1)].category)
                                            }
                                            <br />
                                        </Typography>

                                        <Typography variant="h6">
                                            {site.site_name}
                                        </Typography>

                                        <Typography>
                                            Energy Budget: &nbsp; {site.energy_budget}
                                        </Typography>


                                    </CardContent>
                                    <CardActions>
                                        <div className={classes.button}>
                                            <Button
                                                size="large"
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => this.selectSite(index)}

                                            >
                                                Select Site

                                        </Button>
                                        </div>
                                    </CardActions>
                                </Card>
                            )}
                                <SitesMap
                                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCZv9A4Vtnra6r04z9JnNk91zeXwX82O68&v=3.exp&libraries=geometry,drawing,places"
                                    loadingElement={<div style={{ height: `100%` }} />}
                                    containerElement={<div style={{ height: `80vmin`, width: '80vmin', marginLeft: '35vmin', }} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                                    isMarkerShown={this.state.isMarkerShown}
                                    onMarkerClick={this.handleMarkerClick}
                                    handleToggleOpen={this.handleToggleOpen}
                                    isOpen={this.state.isOpen}
                                    onClick={this.handleClick}
                                    location={this.state.location}
                                    handleClick={this.handleClick}
                                    mapClicked={this.state.mapClicked}
                                    selectSite={this.selectSite}
                                >
                           

                                </SitesMap>


                                
                        </div>
                                {this.state.currentIndex < 0 ? <h2 id="siteSelect">Choose a site!</h2> :
                                    <SavedSitePage
                                        index={this.state.currentIndex}
                                />}
                    </div>
                    }

                </div>
                <div id="bugSpacing"></div>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    sitesByProject: state.sitesByProject,
    state: state,
    project: state.project,
    allSiteTypes: state.allSiteTypes,
});

ProjectPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(ProjectPage));