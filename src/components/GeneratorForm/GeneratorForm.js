import React, { Component } from 'react';
import { connect } from 'react-redux';
import GeneratorList from '../GeneratorList/GeneratorList';

class GeneratorForm extends Component {

    state = {
        showGenerator: false,
        newGenerator: {
            generatorSize: 0,
            energyUnit: '',
            monthlyCost: 0,
        }
    }

    handleGeneratorToggle = () => {
        this.setState({
            ...this.state,
            showGenerator: !this.state.showGenerator
        });
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

    handleAddGenerator = event => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_GENERATOR',
            payload: this.state.newGenerator,
        });
        this.setState({
            newGenerator: {
                generatorSize: 0,
                energyUnit: '',
                monthlyCost: 0,
            }
        });
    }

    render() {
        return (
            <div>
                <h5>Do you have a generator(s)? Check box for 'yes'.</h5>
                <input
                    type="checkbox"
                    checked={this.state.showGenerator}
                    onChange={this.handleGeneratorToggle}
                />
                {this.state.showGenerator === true ? (
                    <React.Fragment>
                        <label htmlFor={this.state.newGenerator.generatorSize}>Generator Size</label>
                        <input
                            type="number"
                            value={this.state.newGenerator.generatorSize}
                            onChange={this.handleChangeFor('generatorSize')}
                        />
                        <label htmlFor={this.state.newGenerator.energyUnit}>Generator Unit</label>
                        <select value={this.state.newGenerator.energyUnit} onChange={this.handleChangeFor('energyUnit')}>
                            <option value="">--Select Energy Unit--</option>
                            <option value="kVA">kVA</option>
                            <option value="kW">kW</option>
                        </select>
                        <br />
                        <label htmlFor={this.state.newGenerator.monthlyCost}>Monthly Fuel Cost</label>
                        <input
                            type="number"
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


            </div>

        )
    }
}

const mapStateToProps = state => ({
    sites: state.sites,
    generator: state.generator,
});

export default connect(mapStateToProps)(GeneratorForm);