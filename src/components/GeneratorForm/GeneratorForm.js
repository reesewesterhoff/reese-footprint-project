import React, { Component } from 'react';

class GeneratorForm extends Component {

    state = {
        hasGenerator: false,
    }

    handleGeneratorToggle = async event => {
        await this.setState({
            hasGenerator: !this.state.hasGenerator,
        });
        await console.log(this.state.hasGenerator);
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
                        <input type="text" placeholder="Generator Size" />
                        <br />
                        <input type="text" placeholder="Monthly Fuel Cost" />
                    </React.Fragment>
                ) : (
                        null
                    )}

            </div>

        )
    }
}

export default GeneratorForm;