import React, { Component } from 'react';
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

const mapStateToProps = state => ({
    sites: state.sites,
    generator: state.generator,
});

export default connect(mapStateToProps)(GeneratorList);