export default (state:{isLogined : boolean, isLoading : boolean} = {isLogined: false,isLoading : false}, action : {type:string,payload?:any}) => {
    switch (action.type) {
      case 'LOGIN':
        return {...state, isLogined: true};
      case 'LOGOUT':
        return {...state, isLogined: false};
      case 'SET_LOADING_TRUE':
        return {...state, isLoading: true};
      case 'SET_LOADING_FALSE':
        return {...state, isLoading: false};
      default:
        return state;
}
}