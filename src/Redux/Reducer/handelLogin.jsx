




export const handelLogin = (state = {isAuth:localStorage.getItem("isAuth")?localStorage.getItem("isAuth"):false ,
 name:'',
 email:localStorage.getItem("email")?localStorage.getItem("email"):'',
 avatar:localStorage.getItem("avatar")?localStorage.getItem("avatar"):'',
 userID:'',
 info:{isAuth:false,},

} ,action )=>{

    switch (action.type) {
        case "YES_LOGIN":
            return  localStorage.setItem("isAuth", true) ;
            case "NO_LOGIN":
                return  localStorage.clear(), {isAuth:false} , window.location.pathname = "/";
                case "USERID":
                    return  {...state, userID:action.payload};
                    case "INFO":
                        return  {...state, info:action.payload};
        default:
            return state;
    }
}

