import React from 'react';
import { connect } from 'react-redux';

const SavedSitesPage = (props) => {

        let site= props.sites[props.index];
        
        return (
            <div>
                <h1>Saved Site</h1>
                <h2>Name: {site.site_name}</h2>
                <h4>Start Date: {site.start_date}</h4>
                <h4>End Date: {site.end_date}</h4>
                <h4>Monthly Energy Budget: {site.energy_budget}</h4>
            </div>

        );
}

const mapStateToProps = state => ({
    sites: state.sitesByProject,
});


export default connect(mapStateToProps)(SavedSitesPage);