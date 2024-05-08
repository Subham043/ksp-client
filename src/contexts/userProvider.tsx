import React, { createContext, useCallback, useMemo, useState } from "react";
import { ChildrenType, UserType } from "../utils/types";
import { getCookie, setCookie } from "react-use-cookie";

export const UserCookieName = 'KSP_SESSION';

/*
  * User Context Type
*/
type UserContextType = {
    isAuthenticated: boolean;
    user: UserType | null;
    userCookieData: UserType | undefined;
    setUser: (data:UserType) => void;
    removeUser: () => void
}

/*
  * User Context Default Value
*/
const userDefaultValues: UserContextType = {
    isAuthenticated: false,
    user: null,
    userCookieData: undefined,
    setUser: () => {},
    removeUser: () => {}
};

/*
  * User Context
*/
export const UserContext = createContext<UserContextType>(userDefaultValues);

/*
  * User Provider
*/
const UserProvider: React.FC<ChildrenType> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const fetchCookie = useCallback((value:string)=>getCookie(value),[])

  /*
   * Function for setting user state
   */
  const userHandler = useCallback(async (data: UserType) => {
    setUser(data);
    setIsAuthenticated(true);
    setCookie(UserCookieName, btoa(JSON.stringify(data)));
  }, []);

  const removeUser = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const userCookieData = useMemo(()=>{
    const cookie = fetchCookie(UserCookieName);
    if(cookie.length>0) {
      try {
        const encryptedString = atob(cookie);
        const decryptedData = JSON.parse(encryptedString) as UserType|null;
        if(decryptedData){
          return decryptedData as UserType;
        }else{
            return undefined;
        }
      } catch (error) {
          return undefined;
      }
    }
    return undefined;
  }, [fetchCookie]);

  return (
    <UserContext.Provider
      value={{ 
        user, 
        userCookieData,
        setUser:userHandler,
        isAuthenticated, 
        removeUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;