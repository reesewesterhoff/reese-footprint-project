import React from 'react';
import { connect } from 'react-redux';

const SavedSitePage = (props) => {

        let site = props.sites[props.index] || {};
        let selectedSite = props.siteTypes[site.site_type_id];

        const datasets = [{
            label: 'Time to cover initial investment',
            data: [{ //these values will be set dynamically when user enters info
                x: new Date(props.sites[0].fundStartDate),
                y: selectedSite.total_price || 25000
            }, {
                x: props.dieselCalculation.payOffDate,
                y: 0
            }],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)'
            ],

            borderWidth: 1,

        }, {
            label: 'Solar energy savings',
            data: [{
                x: props.dieselCalculation.payOffInTime ?
                    props.dieselCalculation.payOffDate : new Date(site.fundStartDate),
                y: 0
            }, {
                x: site.fundEndDate,
                y: props.dieselCalculation.payOffInTime ?
                    props.dieselCalculation.totalDieselCost - selectedSite.total_price : 0
            }],
            backgroundColor: [
                'rgba(100, 100, 300, 0.4)'
            ],
            borderColor: [
                'green'
            ],
            borderWidth: 1
        }, {
            label: 'Cost of Diesel',
            data: [{
                x: site.fundStartDate,
                y: 0
            }, {
                x: site.fundEndDate,
                y: props.dieselCalculation.totalDieselCost || 35000
            }],
            backgroundColor: [
                'grey'
            ],
            borderColor: [
                'grey'
            ],
            borderWidth: 1
        }]

        const options = {
            scales: {
                xAxes: [{
                    type: 'time',
                    unitStepSize: 1,
                    time: {
                        unit: 'year',
                        suggestedMax: '2020-01-05T18:06:17.762Z',
                        suggestedMin: '2014-12-30T18:06:17.762Z',
                    },
                    distribution: 'linear'
                }],
            }
        }
        
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
    siteTypes: state.siteTypesReducer,
    dieselCalculation: state.dieselCalculation,
    generator: state.generator
});


export default connect(mapStateToProps)(SavedSitePage);