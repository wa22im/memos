import { actionTypesPost } from "../components/shared/constants";

export default (
  state = {
    posts: [],
    currentPage: 1,
    numberOfPages: 1,
  },
  action
) => {
  switch (action.type) {
    case actionTypesPost.FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case actionTypesPost.SEARCH_POST:
      return {
        ...state,
        posts: action.payload,
      };
    case actionTypesPost.CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case actionTypesPost.COMMENT:
    case actionTypesPost.UPDATE:
    case actionTypesPost.LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case actionTypesPost.DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };

    default:
      return [];
  }
};
