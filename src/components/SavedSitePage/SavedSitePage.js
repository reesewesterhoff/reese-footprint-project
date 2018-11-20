import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const SavedSitePage = (props) => {

        let site = props.sites[props.index] || {};
        const total_price = props.allSiteTypes[site.site_type_id-1].total_price; 
        const payoff_date = (moment(site.start_date)).add(
            total_price/( site.generators.map(generator=>parseInt(generator.fuel_cost)).reduce((total,current)=>total+current) )
        , 'months');
        const project_duration = (moment(site.end_date)).diff(moment(site.start_date), 'months');
        
        const datasets = [{
            label: 'Time to cover initial investment',
            data: [{ 
                x: moment(site.start_date),
                y: total_price 
            }, {
                x: payoff_date,
                y: 0
            }],
            backgroundColor: payoff_date.isBefore(moment(site.end_date))? [
                'rgb(0,0,255,0.7)'
            ] : [
                '#DC143C'
            ],
            borderColor: [
                'rgb(0,0,255)'
            ],

            borderWidth: 1,

        }, {
            label: 'Solar energy savings',
            data: [{
                x: payoff_date.isBefore(moment(site.end_date)) ?
                    payoff_date : moment(site.start_date),
                y: 0
            }, {
                x: moment(site.end_date),
                y: payoff_date.isBefore(moment(site.end_date))  ?
                    site.energy_budget * project_duration - total_price : 0
            }],
            backgroundColor: [
                '#228b22'
            ],
            borderColor: [
                '#228b22'
            ],
            borderWidth: 1
        }, {
            label: 'Cost of Diesel',
            data: [{
                x: site.start_date,
                y: 0
            }, {
                x: site.end_date,
                y: site.energy_budget*project_duration,
            }],
            backgroundColor: [
                'rgb(128,128,128,0.7)'
            ],
            borderColor: [
                'grey'
            ],
            borderWidth: 1
        }
    ]

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
                    distribution: 'linear',
                    scaleLabel: {
                        display: true,
                        labelString: 'Project Timeline'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Energy Costs'
                    }
                }]
            },
        };

        return (
            <div>
                <h1>Saved Site</h1>
                <h2>Name: {site.site_name}</h2>
                <h4>Start Date: {(new Date(site.start_date).toDateString())}</h4>
                <h4>End Date: {(new Date(site.end_date)).toDateString()}</h4>
                <h4>Monthly Energy Budget: ${site.energy_budget.toLocaleString()}</h4>
                <h4>Site Type: {props.allSiteTypes[site.site_type_id-1].type}</h4>
                {/* <img src={site.image_string} /> */}
                <div style={{ maxWidth: "75%", margin: "auto" }}>
                <Line data={{ datasets: datasets }} options={options}/>
            </div>
                <pre>{JSON.stringify(site,null,2)}</pre>
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