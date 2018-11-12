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
            type: 'ADD_SITE', payload: {...this.state, ...this.props.generator}
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
                        <input type="text" placeholder="Site Name" value={this.state.siteName} onChange={this.handleChange('siteName')} />
                        <input type="date" placeholder="Funding Start Date" value={this.state.fundStartDate} onChange={this.handleChange('fundStartDate')} />
                        <input type="date" placeholder="Funding End Date" value={this.state.fundEndDate} onChange={this.handleChange('fundEndDate')} />
                        <GeneratorForm />
                        <input type="submit" value="Submit" />
                </form>
                {JSON.stringify(this.props.state.sites, null, 2)}
            </div>

        );
    }
}

const mapStateToProps = state => ({
    state: state,
    generator: state.generator,
  });
  

export default connect(mapStateToProps)(AddSite);