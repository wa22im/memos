import { actionTypesAuth } from "../components/shared/constants";

export default (state=null, action)=>{
    
    switch (action.type) {
    case actionTypesAuth.AUTH :
   
            localStorage.setItem('profile',JSON.stringify(action?.data))
        return {...action?.data}
    case actionTypesAuth.LOGOUT:
        localStorage.removeItem('profile')
        return null
    case actionTypesAuth.GET_FROM_STORAGE:
        if (localStorage.getItem('profile') )
        return {...JSON.parse(localStorage.getItem('profile'))}
        else 
        return state
    default :
    return state
    

}
}