import { createContext, useState, useEffect } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  // 로그인 여부
  const [loginStatus, setLoginStatus] = useState(
    localStorage.getItem("loginStatus") || ""
  );

  useEffect(() => {
    localStorage.setItem("loginStatus", loginStatus);
  }, [loginStatus]);

  // 멤버쉽 여부
  const [isKikiMember, setIsKikiMember] = useState(
    localStorage.getItem("isKikiMember") || ""
  );
  useEffect(() => {
    localStorage.setItem("isKikiMember", isKikiMember);
  }, [isKikiMember]);

  return (
    <UserContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        isKikiMember,
        setIsKikiMember,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserStore;
