import React, { Component } from 'react';
import { connect } from 'react-redux';

class GeneratorItem extends Component {
    render() {
        return (
            <React.Fragment>
                <li key={this.props.newGen.generatorSize}>
                    Total Generator Load: {this.props.newGen.generatorSize} {this.props.newGen.energyUnit} <br/> Monthly Fuel Cost: ${this.props.newGen.monthlyCost}
                </li>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    sites: state.sites,
    generator: state.generator,
});

export default connect(mapStateToProps)(GeneratorItem)