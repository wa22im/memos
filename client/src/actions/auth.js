import * as api from '../service'
import { actionTypesAuth } from '../components/shared/constants';

export const signIn =(formData , history)=> async (dispatch)=>{
    try{
        const {data} = await api.signIn(formData)
        history.push("/")
        dispatch({type:actionTypesAuth.AUTH,data})
    }catch(error){}
}

export const signUp =(formData , history)=> async(dispatch)=>{
    try{
        const {data} = await api.signUp(formData)

        history.push("/")
        dispatch({type:actionTypesAuth.AUTH,data})
        history.push("/")
    }catch(error){}
}