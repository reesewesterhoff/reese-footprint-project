import React, { Component } from 'react';
import { connect } from 'react-redux';

class GeneratorForm extends Component {

    state = {
        showGenerator: false,
        generator: {
            size: '',
            monthlyCost: 0,
            energyUnit: '',
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
            generator: {
                ...this.state.generator,
                [property]: event.target.value,
            },
        });
    }

    handleAddGenerator = event => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_GENERATOR',
            payload: this.state.generator,
        });
        this.setState({
            showGenerator: false,
        });
    }

    render() {
        return (
            <div>
                <h1>Generator Form</h1>

                <h5>Do you have a generator(s)? Check box for 'yes'.</h5>
                <input
                    type="checkbox"
                    checked={this.state.showGenerator}
                    onChange={this.handleGeneratorToggle}
                />
                <form onSubmit={this.handleAddGenerator}>
                    {this.state.showGenerator === true ? (
                        <React.Fragment>
                            <input
                                type="text"
                                placeholder="Generator Size"
                                value={this.state.generator.size}
                                onChange={this.handleChangeFor('size')}
                            />
                            <select value={this.state.generator.energyUnit} onChange={this.handleChangeFor('energyUnit')}>
                                <option value="">--Select Energy Unit--</option>
                                <option value="kVA">kVA</option>
                                <option value="kWh">kWh</option>
                            </select>
                            <br />
                            <input
                                type="number"
                                placeholder="Monthly Fuel Cost"
                                value={this.state.generator.monthlyCost}
                                onChange={this.handleChangeFor('monthlyCost')}
                            />
                        </React.Fragment>
                    ) : (
                            null
                        )}

                    <input type="submit" />
                </form>


                {JSON.stringify(this.state, null, 2)}
            </div>

        )
    }
}

const mapStateToProps = state => ({
    generator: state.generator,
});

export default connect(mapStateToProps)(GeneratorForm);