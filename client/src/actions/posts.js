import { actionTypesAuth, actionTypesPost } from "../components/shared/constants";
import * as api from "../service";
export const getPosts =
  (page = 1) =>
  async (dispatch) => {
    try {
      const { data } = await api.fetchPosts(page);

      dispatch({
        type: actionTypesPost.FETCH_ALL,
        payload: data,
      });
    } catch (error) {
      console.log(error.response.status);
      dispatch({
        type: actionTypesPost.FETCH_ALL,
        payload: [],
      });
    }
  };

// search for posts
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsBySearch(searchQuery);

    dispatch({
      type: actionTypesPost.COMMENT,
      payload: data,
    });
  } catch (error) {
      if (error.response.status===400){
          dispatch({
              type:actionTypesAuth.LOGOUT
          })
      }
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: actionTypesPost.CREATE, payload: data });
  } catch (error) {
    if (error.response.status===400){
        dispatch({
            type:actionTypesAuth.LOGOUT
        })
    }
  }
};
export const updatePost = (post) => async (dispatch) => {
  try {
    await api.updatePost(post);
    dispatch({
      type: actionTypesPost.UPDATE,
      payload: post,
    });
  } catch (error) {
    if (error.response.status===400){
        dispatch({
            type:actionTypesAuth.LOGOUT
        })
    }
  }
};

export const deletePost = (post) => async (dispatch) => {
  try {
    await api.deletePost(post);
    dispatch({
      type: actionTypesPost.DELETE,
      payload: post,
    });
  } catch (error) {
    if (error.response.status===400){
        dispatch({
            type:actionTypesAuth.LOGOUT
        })
    }
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const post = await api.likePost(id);
    dispatch({
      type: actionTypesPost.LIKE_POST,
      payload: post.data,
    });
  } catch (error) {
    if (error.response.status===400){
        dispatch({
            type:actionTypesAuth.LOGOUT
        })
    }
  
  }
};
export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.commentPost(value, id);
    dispatch({
      type: actionTypesPost.COMMENT,
      payload: data,
    });
  return data.comments
  
  } catch (error) {
    if (error.response.status===400){
        dispatch({
            type:actionTypesAuth.LOGOUT
        })
    }
  }
};
