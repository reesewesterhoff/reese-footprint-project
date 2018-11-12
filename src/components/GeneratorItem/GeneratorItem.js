import React, { Component } from 'react';
import { connect } from 'react-redux';

class GeneratorItem extends Component {
    render() {
        return (
            <React.Fragment>
                <li key={this.props.site.generatorSize}>
                    Total Load: {this.props.site.generatorSize} {this.props.site.energyUnit} <br/> Monthly Fuel Cost: ${this.props.site.monthlyCost}
                </li>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    sites: state.sites,
});

export default connect(mapStateToProps)(GeneratorItem)