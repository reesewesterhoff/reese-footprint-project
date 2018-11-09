import React, {Component} from 'react';

class AddSite extends Component{
    
    state ={
        siteName: '',
        siteLocation: '',
        fundStartDate: '',
        fundEndDate: '',
        monthlyBudget: '',
    }

    handleChange = (property) => (event) =>{
        this.setState({
        ...this.state,
        [property]: event.target.value
    })
    }
    
    handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    }

    render(){
        return (

            <div>
                <h1>Add Site</h1>

                <p>
                This is a calculator that allows you to input your site information 
                to do a cost-benefit comparison of using diesel energy generators 
                to solar alternatives.
                </p>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" placeholder="Site Name" />
                    </label>
                    <label>
                      
                        <input type="text" placeholder="Site Location" />
                    </label>
                    <label>
                       
                        <input type="text"  placeholder="Funding Start Date" />
                    </label>
                    <label>
                    
                        <input type="text" placeholder="Funding End Date" />
                    </label>
                    <label>

                        <input type="text" placeholder="Monthly Budget" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>

        );
    }
}

export default AddSite;