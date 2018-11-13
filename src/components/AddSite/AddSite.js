import React, { Component } from 'react';
import { connect } from 'react-redux';
import GeneratorForm from '../GeneratorForm/GeneratorForm';
import SiteTypeList from '../SiteTypeList/SiteTypeList';
import Results from '../Results/Results';


class AddSite extends Component {

    state = {
        siteName: '',
        fundStartDate: new Date(),
        fundEndDate: new Date(),
    }



    handleChange = property => event => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_SITE', payload: { ...this.state, siteGenerators: this.props.generator }
        });
        this.setState({
            siteName: '',
            fundStartDate: '',
            fundEndDate: '',
        });
    }

    render() {
        return (

            <div>
                <h1 className="heading">Add Site</h1>

                <div className="subHeading">
                    <h3>This is a calculator that allows you to input your site information to do a cost-benefit</h3> 
                    <h3>comparison of using diesel energy generators to solar alternatives.</h3>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Site Name" value={this.state.siteName} onChange={this.handleChange('siteName')} /><br />
                    <label htmlFor={this.state.fundStartDate}>Funding Start Date</label>
                    <input type="date" placeholder="Funding Start Date" value={this.state.fundStartDate} onChange={this.handleChange('fundStartDate')} /><br />
                    <label htmlFor={this.state.fundEndDate}>Funding End Date</label>
                    <input type="date" placeholder="Funding End Date" value={this.state.fundEndDate} onChange={this.handleChange('fundEndDate')} />
                    <GeneratorForm />
                    <input type="submit" value="Submit" />
                </form>
                <br />
                {
                    this.props.sites.length === 0 ?
                    null
                :
                    <SiteTypeList />
                }
                <br />
                <br />
                {
                    this.props.selectedSite.id ?
                    <Results />
                :
                    null
                }
                <br />
                <br />
            </div>

        );
    }
}

const mapStateToProps = state => ({
    sites: state.sites,
    generator: state.generator,
    selectedSite: state.selectedSite,
});


export default connect(mapStateToProps)(AddSite);