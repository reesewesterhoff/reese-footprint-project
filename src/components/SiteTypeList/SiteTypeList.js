import React, { Component } from 'react';
import SiteTypeItem from '../SiteTypeItem/SiteTypeItem';
import { connect } from 'react-redux';
import SiteTypeCategory from '../SiteTypeCategory/SiteTypeCategory';
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
import Results from '../Results/Results';
import scrollToComponent from 'react-scroll-to-component';
import Snackbar from '@material-ui/core/Snackbar';


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

    selectSite = site => {
        this.props.dispatch({ type: 'SET_SELECTED_SITE', payload: site });
        setTimeout(() => scrollToComponent(this.results, { offset: 0, align: 'top', duration: 750 }), 200);
        this.setState({ 
            ...this.state,
            snackbarOpen: true, 
        });
    }

    selectSiteCategory = category => {
        this.props.dispatch({ type: 'FETCH_SITE_TYPES', payload: category });
        this.setState({
            icon: this.chooseIcon(category),
        });
        setTimeout(() => scrollToComponent(this.siteTypeItem, { offset: 0, align: 'top', duration: 750 }), 200);
    }

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
                    <section className='results' ref={(section) => { this.results = section; }}>
                        <Results  
                        addSiteToProject={this.props.addSiteToProject}
                        />
                    </section>
                }
                <div>
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

SiteTypeList.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
    return {
        siteTypes: state.siteTypes,
        selectedSite: state.selectedSite,
    }
}

export default withStyles(styles)(connect(mapStateToProps)(SiteTypeList));