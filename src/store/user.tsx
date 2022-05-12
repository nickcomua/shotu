export default (state:{username:string|null} = {username:null}, action : {type:string,payload?:any}) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return {...state, username: (action.payload as (string|null))}; 
        default:
            return state;
    }
} 