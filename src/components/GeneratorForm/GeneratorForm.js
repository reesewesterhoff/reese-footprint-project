import React, { Component } from 'react';
import { connect } from 'react-redux';
import GeneratorList from '../GeneratorList/GeneratorList';

class GeneratorForm extends Component {

    state = {
        generator: false, // property relating to if the user DOES have a generator
        noGenerator: false, // property relating to if the user DOES NOT have a generator
        newGenerator: {
            generatorSize: '',
            energyUnit: '',
            monthlyCost: '',
        },
        energyBudget: '',
    }

    handleHasGeneratorToggle = () => {
        this.setState({
            ...this.state,
            noGenerator: false,
            generator: !this.state.generator,
            energyBudget: '',
        });
    }

    handleNoGeneratorToggle = () => {
        this.setState({
            ...this.state,
            generator: false,
            noGenerator: !this.state.noGenerator,
            newGenerator: {
                generatorSize: '',
                energyUnit: '',
                monthlyCost: '',
             },
        })
    }

    handleChangeFor = property => event => {
        this.setState({
            ...this.state,
            newGenerator: {
                ...this.state.newGenerator,
                [property]: event.target.value,
            },
        });
    }

    handleChangeForEnergy = event => {
        this.setState({
            ...this.state,
             energyBudget: event.target.value,
        });
    }

    handleAddGenerator = event => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_GENERATOR',
            payload: this.state.newGenerator,
        });
        this.setState({
            newGenerator: {
                generatorSize: '',
                energyUnit: '',
                monthlyCost: '',
            }
        });
    }

    handleAddEnergyBudget = event => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_ENERGY_BUDGET',
            payload: this.state.energyBudget
        });
    }

    render() {
        return (
            <div>
                <div>
                    <p>Do you currently have a generator?</p>
                    <label htmlFor={this.state.generator.toString()}>Yes</label>
                    <input
                        type="checkbox"
                        checked={this.state.generator}
                        onChange={this.handleHasGeneratorToggle}
                    />
                    <label htmlFor={this.state.noGenerator.toString()}>No</label>
                    <input
                        type="checkbox"
                        checked={this.state.noGenerator}
                        onChange={this.handleNoGeneratorToggle}
                    />
                </div>
                <br />
                {this.state.generator === true ? (
                    <React.Fragment>
                        <label htmlFor={this.state.newGenerator.generatorSize}>Generator Size</label>
                        <input
                            type="text"
                            placeholder="Enter Load Size"
                            value={this.state.newGenerator.generatorSize}
                            onChange={this.handleChangeFor('generatorSize')}
                        />
                        <label htmlFor={this.state.newGenerator.energyUnit}>Generator Energy Unit</label>
                        <select value={this.state.newGenerator.energyUnit} onChange={this.handleChangeFor('energyUnit')}>
                            <option value="">--Select Energy Unit--</option>
                            <option value="kVA">kVA</option>
                            <option value="kW">kW</option>
                        </select>
                        <br />
                        <label htmlFor={this.state.newGenerator.monthlyCost}>Monthly Fuel Cost (USD $)</label>
                        <input
                            type="text"
                            placeholder="Monthly Fuel Cost"
                            value={this.state.newGenerator.monthlyCost}
                            onChange={this.handleChangeFor('monthlyCost')}
                        />
                        <button
                            onClick={this.handleAddGenerator}
                        >
                            Add Generator
                    </button>
                        {this.props.sites.generatorSize !== null ? (
                            <GeneratorList />
                        ) : (
                                null
                            )}
                    </React.Fragment>
                ) : (
                        null
                    )}
                {this.state.noGenerator === true ? (
                    <React.Fragment>
                        <label htmlFor={this.state.energyBudget}>Monthly Energy Budget (USD $)</label>
                        <input
                            type="text"
                            placeholder="Enter a monthly energy budget"
                            value={this.state.energyBudget}
                            onChange={this.handleChangeForEnergy}
                        />
                        <button
                            onClick={this.handleAddEnergyBudget}
                        >
                            Add Monthly Energy Budget
                    </button>
                    </React.Fragment>
                ) : (
                        null
                    )}
            </div>

        )
    }
}

const mapStateToProps = state => ({
    sites: state.sites,
    generator: state.generator,
});

export default connect(mapStateToProps)(GeneratorForm);