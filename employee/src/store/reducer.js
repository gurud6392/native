const initialState = {
	theme: 'white'
};
const Reducers = (state = initialState, action) => {
    switch(action.type) {		
		case 'SET_THEME':
			return {
				...state,
				theme: action.theme
			};		
		default:
			return state;
	}
}
export default Reducers;