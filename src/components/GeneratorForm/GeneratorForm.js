import React, { Component } from 'react';

class GeneratorForm extends Component {

    state = {
        hasGenerator: false,
        generator: {
            size: '',
            monthlyCost: 0,
        }
    }

    handleGeneratorToggle = event => {
        this.setState({
            hasGenerator: !this.state.hasGenerator,
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

    render() {
        return (
            <div>
                <h1>Generator Form</h1>

                <h5>Do you have a generator(s)? Check box for 'yes'.</h5>
                <input
                    type="checkbox"
                    value={this.state.hasGenerator}
                    onClick={this.handleGeneratorToggle}
                />

                {this.state.hasGenerator ? (
                    <React.Fragment>
                        <input 
                          type="text" 
                          placeholder="Generator Size" 
                          value={this.state.generator.size} 
                          onChange={this.handleChangeFor('size')}
                        />
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
                    {JSON.stringify(this.state, null, 2)}
            </div>

        )
    }
}

export default GeneratorForm;