import React from 'react';
import { connect } from 'react-redux';

const SavedSitePage = (props) => {

        let site = props.sites[props.index] || {};
        
        return (
            <div>
                <h1>Saved Site</h1>
                <h2>Name: {site.site_name}</h2>
                <h4>Start Date: {(new Date(site.start_date).toDateString())}</h4>
                <h4>End Date: {(new Date(site.end_date)).toDateString()}</h4>
                <h4>Monthly Energy Budget: ${site.energy_budget.toLocaleString()}</h4>
                <h4>Site Type: {props.allSiteTypes[site.site_type_id-1].type}</h4>
                <img src={site.image_string} />
            </div>
        );
}

const mapStateToProps = state => ({
    sites: state.sitesByProject,
    siteTypes: state.siteTypes,
    allSiteTypes: state.allSiteTypes,
    dieselCalculation: state.dieselCalculation,
    generator: state.generator
});


export default connect(mapStateToProps)(SavedSitePage);