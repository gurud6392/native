const initialState = {
	theme: 'white'
};
const Reducers = (state = initialState, action) => {
	console.log(action, 'act');
	
    switch(action.type) {		
		case 'white':
			return {
				...state,
				theme: 'dark'
			};
		case 'dark':
			return {
				...state,
				theme: 'white'
			};
		default:
			return state;
	}
}
export default Reducers;