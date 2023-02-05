


export const PostsReducer = (state = {Posts:[],Loading:localStorage.getItem("Loading")?localStorage.getItem("Loading"):false} ,action )=>{

    switch (action.type) {
        case "YES_POSTS":
            return{ Posts:action.data};
            case "LOADING":
                return{ Loading:action.data};
            case "NO_POSTS":
                return{ Posts:action.data};
  
        default:
            return state;
    }
}



