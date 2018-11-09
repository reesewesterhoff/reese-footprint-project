import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddSite extends Component {

    state = {
        siteName: '',
        fundStartDate: '',
        fundEndDate: '',
        monthlyBudget: '',
    }

    handleChange = (property) => (event) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_SITE', payload: this.state
        })
        
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
                        <input type="text" placeholder="Funding Start Date" value={this.state.fundStartDate} onChange={this.handleChange('fundStartDate')} />
                        <input type="text" placeholder="Funding End Date" value={this.state.fundEndDate} onChange={this.handleChange('fundEndDate')} />
                        <input type="text" placeholder="Monthly Budget" value={this.state.monthlyBudget} onChange={this.handleChange('monthlyBudget')} />
                        <input type="submit" value="Submit" />
                </form>
                
            </div>

        );
    }
}

const mapStateToProps = state => ({
    state: state,
  });
  

export default connect(mapStateToProps)(AddSite);