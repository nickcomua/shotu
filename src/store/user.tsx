

export default (state:{username:string|'null',uid:string,photo:string|null,bio:string|null,contacts:{id:string,username:string,photo:string}[]} = {username:null,photo:null,uid:null,bio:null,contacts:[]}, action : {type:string,payload?:any}) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return {...state, username : (action.payload as string)}; 
        case 'ADD_CONTACT':
            return {...state, contacts: state.contacts.concat(action.payload.id,action.payload.username,action.payload.photo)};
        case 'REMOVE_CONTACT':
            return {...state, contacts: state.contacts.filter(contact => contact.id !== action.payload.id)};
        case 'LOGOUT':
            return {username:null,uid:null,photo:null,bio:null,contacts:[]};
        case 'SET_PHOTO':
            return {...state, photo: (action.payload as string)};
        case 'SET_BIO':
            return {...state, bio: (action.payload as string)};
        case 'SET_UID':
            return {...state, uid: (action.payload as string)};
        default:
            return state;
    }
} 