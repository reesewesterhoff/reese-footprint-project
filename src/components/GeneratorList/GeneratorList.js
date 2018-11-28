import React, { Component } from 'react';
// connect to redux state
import { connect } from 'react-redux';

class GeneratorList extends Component {
    render() {
        let totalCost = 0;
        this.props.generator.map(newGen => totalCost += Number(newGen.monthlyCost));
        return (
            <div>
                Total Monthly Energy Cost:
                   ${totalCost.toFixed(2)}
            </div>
        )
    }
}

// allows access to info in redux state
const mapStateToProps = state => ({
    sites: state.sites,
    generator: state.generator,
});

export default connect(mapStateToProps)(GeneratorList);