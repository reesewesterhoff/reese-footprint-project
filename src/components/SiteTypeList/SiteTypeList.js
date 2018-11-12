import React, { Component } from 'react';
import SiteTypeItem from '../SiteTypeItem/SiteTypeItem';
import { connect } from 'react-redux';
import SiteTypeCategory from '../SiteTypeCategory/SiteTypeCategory';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    card: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        margin: 10,
    }
}


class SiteTypeList extends Component {

    componentDidMount() {
       
    }

    selectSite = (site) => {
        console.log('clicked site', site);
        this.props.dispatch({ type: 'SET_SELECTED_SITE', payload: site });
    }

    selectSiteCategory = (category) => {
        console.log(category);
        this.props.dispatch({ type: 'FETCH_SITE_TYPES' });
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <h1 className="heading">Select Site Category</h1>
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