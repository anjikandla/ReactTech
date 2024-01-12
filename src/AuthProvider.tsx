import React, { useContext, useState, createContext } from 'react';

const AuthContext = createContext<any>({});
export const AuthProvider = ({children}: {children: React.ReactNode}) =>{
    const [user,setUser] = useState();
    
    const login = (Loggeduser:any) => {
        setUser(Loggeduser);
    }
    const logout = (LogOutduser:any) => {
        setUser(LogOutduser);
    }
    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () =>{
    return useContext(AuthContext);
}