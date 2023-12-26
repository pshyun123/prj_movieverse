import { styled } from "styled-components";
import Button from "../../util/Button";
import { useNavigate } from "react-router-dom";
const AdminMenuComp = styled.div`
  flex-grow: 3;
  min-width: 400px;
  .btnBox {
    width: 200px;
    position: sticky;
    top: 13%;
    left: 150px;
    button {
      margin-bottom: 40px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const AdminMenu = () => {
  const navigate = useNavigate();
  return (
    <>
      <AdminMenuComp>
        <div className="btnBox">
          <Button
            children="회원 관리"
            width="100%"
            active={true}
            clickEvt={() => {
              navigate("/admin");
            }}
          />
          <Button
            children="게시글 관리"
            width="100%"
            active={true}
            clickEvt={() => {
              navigate("/admin/board");
            }}
          />
          <Button
            children="FAQ 관리"
            width="100%"
            active={true}
            clickEvt={() => {
              navigate("/admin/faq");
            }}
          />
        </div>
      </AdminMenuComp>
    </>
  );
};
export default AdminMenu;
