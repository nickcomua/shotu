export default (state:{username:string|null,photo:number|null} = {username:null, photo:null}, action : {type:string,payload?:any}) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return {...state, username: action.payload};
        case 'SET_PHOTO':
            return {...state, photo: state.photo + action.payload};
        case 'SET_PHOTO_NULL':
            return {...state, photo: null};
        case 'SET_PHOTO_1':
            return {...state, photo: 1};
        default:
            return state;
    }
} 