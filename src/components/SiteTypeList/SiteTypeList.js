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
    }

    selectSite = (site) => {
        this.props.dispatch({ type: 'SET_SELECTED_SITE', payload: site });
    }

    selectSiteCategory = async (category) => {
        await this.props.dispatch({ type: 'FETCH_SITE_TYPES', payload: category });
        this.setState({
            icon: this.chooseIcon(category),
        });    
    }

    chooseIcon = (iconCategory) => {
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
    }
}

export default withStyles(styles)(connect(mapStateToProps)(SiteTypeList));