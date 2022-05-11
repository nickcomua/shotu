export default (state:{username:string|null,photo:string|null} = {username:null, photo:null}, action : {type:string,payload?:any}) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return {...state, username: action.payload};
        case 'SET_PHOTO':
            return {...state, photo: action.payload};
        default:
            return state;
    }
}