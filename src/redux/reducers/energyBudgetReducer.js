const energyBudget = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_ENERGY_BUDGET':
            return action.payload;
        default:
            return state;
    }
}

export default energyBudget;