const initStateForLoading = {
    loading:true
}
const loadingReducer = (state=initStateForLoading , action) =>{
    const {payload} = action;
    switch(action.type){
        case 'PAGE_LOADING':
            return {...state, loading:payload}
        case 'PAGE_UNLOADING':
            return {...state, loading:payload}
        default:
            return state
    }
}

export default loadingReducer