import React, { Component } from 'react';
import { connect } from 'react-redux';
import GeneratorForm from '../GeneratorForm/GeneratorForm';


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
            type: 'ADD_SITE', payload: { ...this.state, ...this.props.generator }
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
                <h1>Add Site</h1>

                <p>
                    This is a calculator that allows you to input your site information
                    to do a cost-benefit comparison of using diesel energy generators
                    to solar alternatives.
                </p>

                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Site Name" value={this.state.siteName} onChange={this.handleChange('siteName')} /><br />
                    <label htmlFor={this.state.fundStartDate}>Funding Start Date</label>
                    <input type="date" placeholder="Funding Start Date" value={this.state.fundStartDate} onChange={this.handleChange('fundStartDate')} /><br />
                    <label htmlFor={this.state.fundEndDate}>Funding End Date</label>
                    <input type="date" placeholder="Funding End Date" value={this.state.fundEndDate} onChange={this.handleChange('fundEndDate')} />
                    <GeneratorForm />
                    <input type="submit" value="Submit" />

                </form>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    sites: state.sites,
    generator: state.generator,
});


export default connect(mapStateToProps)(AddSite);