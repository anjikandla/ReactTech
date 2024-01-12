import { Navigate, RouteProps, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { ReactElement } from "react";

export type AuthRouteProps = RouteProps & {
    element: ReactElement;
}
export const AuthRequire:React.FC<AuthRouteProps> = ({element:Component}) =>{
    const auth = useAuth()
    const navigate = useNavigate()
    // if(!auth.user){
    //     return Component
    // }else{
    //     navigate('/login');
    // }
    return(
        auth.user ? Component : <Navigate to="/login"/>
    )
}