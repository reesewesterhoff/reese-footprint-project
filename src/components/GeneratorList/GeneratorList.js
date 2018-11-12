import React, { Component } from 'react';
import { connect } from 'react-redux';
import GeneratorItem from '../GeneratorItem/GeneratorItem';

class GeneratorList extends Component {
    render() {
        return (
            <div>
                List of Generators:
                <ul>
                    {this.props.sites.map(site => (
                        <GeneratorItem 
                            key={site.generatorSize}
                            site={site}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    sites: state.sites,
});

export default connect(mapStateToProps)(GeneratorList);