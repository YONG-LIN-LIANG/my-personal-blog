const initStateForBlog = {
    posts: [],
    pinnedTagPosts:[],
    tags:[],
    nowIndex:0
}

const blogReducer = (state = initStateForBlog, action) => {
    const { payload } = action;
    switch (action.type) {
        case 'POST_UPLOAD':
            return { ...state, posts: payload }
        case 'TAGS_UPLOAD':
            return { ...state, tags: payload }
        case 'PINNEDTAGPOSTS_UPLOAD':
            return { ...state, pinnedTagPosts: payload }
        case 'NOWINDEX_UPLOAD':
            return { ...state, nowIndex: payload }
        default:
            return state
    }
}

export default blogReducer