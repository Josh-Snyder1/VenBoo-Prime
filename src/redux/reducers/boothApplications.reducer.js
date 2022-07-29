// Reducer that will handle the collection of booth
// applications by vendors for a specific event
const boothApplications = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENT_BOOTH_APPLICATIONS':
            return action.payload;
        case "UNSET_USER":
            return [];
        default:
            return state;
    }
}

export default boothApplications;