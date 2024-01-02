import { Outlet } from "react-router-dom";
import AdminMenu from "../../component/Administor/AdminMenu";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../../context/UserStore";

const AdminLayoutComp = styled.div`
  min-height: 100vh;
  padding-bottom: 80px;
  display: flex;
  .wrapper {
    flex-grow: 6;
  }
`;

const AdminLayout = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { loginStatus } = context;

  useEffect(() => {
    if (loginStatus !== "ADMIN") {
      //로그인 하지 않았다면 로그인 페이지로 이동
      navigate("/logina");
    }
  }, []); // []<-화면 마운트시 최초 한번 실행

  return (
    <>
      <AdminLayoutComp>
        <AdminMenu />
        <div className="wrapper">
          <Outlet />
        </div>
      </AdminLayoutComp>
    </>
  );
};
export default AdminLayout;
