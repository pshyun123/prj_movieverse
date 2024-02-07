import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserStore";
import { useMediaQuery } from "react-responsive";
import Nav from "./Nav";

import HeaderComp from "./HeaderStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../../images/movieverse_logo.png";

const Header = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { loginStatus, setLoginStatus, setIsKikiMember } = context;

  const [active, setOpen] = useState("");
  const [icon, setIcon] = useState(active === "" ? faBars : faXmark);

  // useEffect(() => {
  //   console.log(loginStatus);
  // }, [loginStatus]);

  const isMobile = useMediaQuery({
    query: "(max-width:768px)",
  });
  // console.log("isMobile : " + isMobile);

  const mMenuClick = () => {
    if (isMobile) {
      active === "active" ? setOpen("") : setOpen("active");
      setIcon(icon === faBars ? faXmark : faBars);
    }
  };

  const onLogOutClick = () => {
    setLoginStatus("");
    setIsKikiMember("");
    console.log(
      "유저로그아웃 확인 상태" + window.localStorage.getItem("loginStatus")
    );
    window.localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <HeaderComp>
        <div className="container">
          <div className="mo-menu">
            <FontAwesomeIcon
              icon={icon}
              className="m-menu"
              onClick={mMenuClick}
            />
          </div>
          <div className="logo">
            <img
              src={Logo}
              alt="로고"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <Nav active={active} togle={mMenuClick} />
          <div className="log-icon">
            {loginStatus === "" || loginStatus === "RELOGIN" ? (
              <FontAwesomeIcon
                icon={faUser}
                onClick={() => {
                  navigate("/login");
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faRightFromBracket}
                onClick={onLogOutClick}
              />
            )}
          </div>
        </div>
      </HeaderComp>
    </>
  );
};
export default Header;
