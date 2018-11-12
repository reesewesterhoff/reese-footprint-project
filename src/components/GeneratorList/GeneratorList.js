import React, { Component } from 'react';
import { connect } from 'react-redux';
import GeneratorItem from '../GeneratorItem/GeneratorItem';

class GeneratorList extends Component {
    render() {
        return (
            <div>
                List of Generators:
                <ul>
                    {this.props.generator.map(newGen => (
                        <GeneratorItem 
                            key={newGen.generatorSize}
                            newGen={newGen}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    sites: state.sites,
    generator: state.generator,
});

export default connect(mapStateToProps)(GeneratorList);