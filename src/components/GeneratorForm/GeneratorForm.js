import React, { Component } from 'react';
import { connect } from 'react-redux';
import GeneratorList from '../GeneratorList/GeneratorList';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

class GeneratorForm extends Component {

    state = {
        hasGenerator: false, // property relating to if the user DOES have a generator
        energyUsage: {
            generatorSize: '',
            energyUnit: '',
            monthlyCost: '',
        },
    }

    handleHasGeneratorToggle = () => {
        this.setState({
            hasGenerator: !this.state.hasGenerator,
            energyUsage: {
                generatorSize: '',
                energyUnit: '',
                monthlyCost: '',
            }
        });
    }

    handleChangeFor = property => event => {
        this.setState({
            ...this.state,
            energyUsage: {
                ...this.state.energyUsage,
                [property]: event.target.value,
            },
        });
    }

    handleAddEnergyUsage = event => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_GENERATOR',
            payload: this.state.energyUsage,
        });
        this.setState({
            energyUsage: {
                generatorSize: '',
                energyUnit: '',
                monthlyCost: '',
            }
        });
    }

    render() {
        return (
            <div>
                <div>
                    <p>Do you currently have a generator?</p>
                    <InputLabel htmlFor={this.state.hasGenerator.toString()}>Yes</InputLabel>
                    <Checkbox
                        checked={this.state.hasGenerator}
                        onChange={this.handleHasGeneratorToggle}
                    />
                    {/* <InputLabel htmlFor={this.state.noGenerator.toString()}>No</InputLabel>
                    <Checkbox
                        checked={this.state.noGenerator}
                        onChange={this.handleNoGeneratorToggle}
                    /> */}
                </div>
                <br />
                {this.state.hasGenerator === true && (
                    <>
                        <FormControl style={{ margin: 10 }}>
                            {/* <InputLabel htmlFor={this.state.energyUsage.generatorSize}>Generator Size</InputLabel> */}
                            <Input
                                type="text"
                                placeholder="Enter Load Size"
                                value={this.state.energyUsage.generatorSize}
                                onChange={this.handleChangeFor('generatorSize')}
                            />
                            <FormHelperText>Generator Size</FormHelperText>
                        </FormControl>
                        <FormControl style={{ margin: 10 }}>
                            {/* <InputLabel htmlFor={this.state.energyUsage.energyUnit}>--Select Energy Unit--</InputLabel> */}
                            <Select
                                value={this.state.energyUsage.energyUnit}
                                onChange={this.handleChangeFor('energyUnit')}
                            >
                                <MenuItem value="" disabled>--Select Energy Unit--</MenuItem>
                                <MenuItem value="kVA">kVA</MenuItem>
                                <MenuItem value="kW">kW</MenuItem>
                            </Select>
                            <FormHelperText>Generator Energy Unit</FormHelperText>
                        </FormControl>
                        <br />
                        <FormControl style={{ margin: 10 }}>
                            {/* <InputLabel htmlFor={this.state.energyUsage.monthlyCost}>Monthly Fuel Cost (USD $)</InputLabel> */}
                            <Input
                                type="text"
                                placeholder="USD $"
                                value={this.state.energyUsage.monthlyCost}
                                onChange={this.handleChangeFor('monthlyCost')}
                            />
                            <FormHelperText>Monthly Fuel Cost</FormHelperText>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleAddEnergyUsage}
                        >
                            Add Generator
                    </Button>
                        {this.props.generator.length > 0 && <GeneratorList />}
                    </>
                )}
                {this.state.hasGenerator === false && (
                    <>
                        <FormControl style={{ margin: 10 }}>
                            {/* <InputLabel htmlFor={this.state.energyBudget}>Monthly Energy Budget (USD $)</InputLabel> */}
                            <Input
                                type="text"
                                placeholder="USD $"
                                value={this.state.energyUsage.monthlyCost}
                                onChange={this.handleChangeFor('monthlyCost')}
                            />
                            <FormHelperText>Monthly Energy Budget</FormHelperText>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleAddEnergyUsage}
                        >
                            Add Monthly Energy Budget
                    </Button>
                    </>
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