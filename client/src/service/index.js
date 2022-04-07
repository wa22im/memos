import axios from 'axios'

const API = axios.create({baseURL:'http://localhost:5002'})

API.interceptors.request.use((req)=>{

    if ( localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})
export const fetchPostById =(post)=>API.get(`${'/posts'}/${post}`)
export const fetchPosts=(pageNumber)=> API.get(`/posts?page=${pageNumber}`) ;
export const fetchPostsBySearch=(searchQuery)=> API.get(`/posts/search?searchQuery=${searchQuery.search|| 'none'}&tags=${searchQuery.tags|| 'none'}` ) ;
export const createPost=(post)=>API.post('/posts',post)
export const updatePost =(post)=>API.patch(`${'/posts'}/${post._id}`,post)
export const deletePost =(post)=>API.delete(`${'/posts'}/${post._id}`)
export const likePost =(id)=>API.patch(`${'/posts'}/${id}/likes`) 
export const signIn = (formData)=>API.post('/users/signin',formData)
export const signUp = (formData)=>API.post('/users/signUp',formData)
export const commentPost =(value,id)=>API.patch(`/posts/${id}/commentPost`,{value})

