import React, { Component } from 'react';
// import SiteTypeItem, SiteTypeCategory, and Results components
import SiteTypeItem from '../SiteTypeItem/SiteTypeItem';
import SiteTypeCategory from '../SiteTypeCategory/SiteTypeCategory';
import Results from '../Results/Results';
// connect to redux state
import { connect } from 'react-redux';
// material-ui imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RouterIcon from '@material-ui/icons/Router';
import WavesIcon from '@material-ui/icons/Waves';
import SecurityIcon from '@material-ui/icons/Security';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
// import for forced scrolling
import scrollToComponent from 'react-scroll-to-component';
// snackbar for site selection
import Snackbar from '@material-ui/core/Snackbar';

// jss styles
const styles = {
    card: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        margin: 10,
    },
}

class SiteTypeList extends Component {

    state = {
        icon: '',
        snackbarOpen: false,
    }

    // handles select of site, forces scroll to results component, and opens snackbar
    selectSite = site => {
        this.props.dispatch({ type: 'SET_SELECTED_SITE', payload: site });
        setTimeout(() => scrollToComponent(this.results, { offset: 0, align: 'top', duration: 750 }), 200);
        this.setState({ 
            ...this.state,
            snackbarOpen: true, 
        });
    } // end selectSite

    // handles select of site category, forces scroll to site types
    selectSiteCategory = category => {
        this.props.dispatch({ type: 'FETCH_SITE_TYPES', payload: category });
        this.setState({
            icon: this.chooseIcon(category),
        });
        setTimeout(() => scrollToComponent(this.siteTypeItem, { offset: 0, align: 'top', duration: 750 }), 200);
    }

    // based on category, selects the appropriate icon for the site type cards
    chooseIcon = iconCategory => {
        switch (iconCategory) {
            case 'Health':
                return <LocalHospitalIcon />
            case 'Water':
                return <WavesIcon />
            case 'Comms':
                return <RouterIcon />
            case 'Ops':
                return <SecurityIcon />
            case 'Shelter':
                return <HomeIcon />
            case 'Food':
                return <RestaurantIcon />
            case 'Admin':
                return <BusinessCenterIcon />
            case 'Logs':
                return <StoreIcon />
            default:
                return null;
        }
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <h2 className="heading">Select Site Category</h2>
                <h3 className="subHeading">Scroll down to see site type options</h3>
                <div>
                    <SiteTypeCategory
                        selectSiteCategory={this.selectSiteCategory}
                    />
                </div>
                {/* scrolls to here when a category is selected */}
                <section className='siteTypeItem' ref={(section) => { this.siteTypeItem = section; }}>
                <div className={classes.card}>
                    {this.props.siteTypes.map(site => {
                        return <SiteTypeItem
                            site={site}
                            key={site.id}
                            selectSite={this.selectSite}
                            icon={this.state.icon}
                        />
                    }
                    )}
                </div>
                </section>
                <br />
                <br />
                {
                    this.props.selectedSite.id &&
                    // scrolls here upon selecting a site
                    <section className='results' ref={(section) => { this.results = section; }}>
                        <Results  
                        addSiteToProject={this.props.addSiteToProject}
                        />
                    </section>
                }
                <div>
                    {/* snackbar for site select */}
                    <Snackbar
                        open={this.state.snackbarOpen}
                        message={<span id="message-id">Site Selected</span>}
                        autoHideDuration={2000}
                        onClose={() => this.setState({ snackbarOpen: false })}
                    />
                </div>
            </div>
        );
    }
}

// needed for jss styles
SiteTypeList.propTypes = {
    classes: PropTypes.object.isRequired,
};

// allows component to access redux state for information
const mapStateToProps = state => {
    return {
        siteTypes: state.siteTypes,
        selectedSite: state.selectedSite,
    }
}

export default withStyles(styles)(connect(mapStateToProps)(SiteTypeList));