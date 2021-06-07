const initStateForUser = {
    isAuth:false,
    username:''
}
const userReducer = (state=initStateForUser , action) =>{
    const {payload} = action;
    switch(action.type){
        case 'USER_LOGIN':
            return {...state, isAuth: payload.isAuth, username:payload.username}
        case 'USER_LOGOUT':
            return {...state, isAuth: payload.isAuth}
        default:
            return state
    }
}

export default userReducer