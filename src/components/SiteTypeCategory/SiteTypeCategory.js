import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RouterIcon from '@material-ui/icons/Router';
import SiteTypeCategoryCard from '../SiteTypeCategoryCard/SiteTypeCategoryCard';
import WavesIcon from '@material-ui/icons/Waves';

// jss styles
const styles = {
    card: {
        marginTop: 75,
        width: 280,
        height: 320,
        textAlign: 'center',
    },
    pos: {
        marginBottom: 12,
    },
    icon: {
        margin: 2,
        fontSize: 100,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        margin: 'auto',
    },
    cardDiv: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    }
};

class SiteTypeCategory extends Component {

    state = {
        active: null,
    }

    toggleColor = (position) => {
        if (this.state.active === position) {
          this.setState({active : null})
        } else {
          this.setState({active : position})
        }
      }
      
      myColor = (position) => {
        if (this.state.active === position) {
          return "LawnGreen";
        }
        return "";
      }


    render() {

        const { classes } = this.props;
        const hospitalIcon = <LocalHospitalIcon className={classes.icon} />
        const waterIcon = <WavesIcon className={classes.icon} />

        return (
            <div className={classes.cardDiv}>
                <SiteTypeCategoryCard 
                    icon={hospitalIcon}
                    title="Health"
                    selectSiteCategory={this.props.selectSiteCategory}
                    color={{background: this.myColor(0)}} 
                    toggleColor={() => {this.toggleColor(0)}}
                />
                <SiteTypeCategoryCard 
                    icon={waterIcon}
                    title="Water"
                    selectSiteCategory={this.props.selectSiteCategory}
                    color={{background: this.myColor(1)}} 
                    toggleColor={() => {this.toggleColor(1)}}
                />
            </div>
        );
    }
}

SiteTypeCategory.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SiteTypeCategory);