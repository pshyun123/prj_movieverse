import { useNavigate } from "react-router-dom";

const Nav = ({ active, togle }) => {
  const navigate = useNavigate();

  console.log("active :" + active);

  const onClickMenu = (num) => {
    switch (num) {
      case 1:
        navigate("/moviesearch");
        togle();
        break;
      case 2:
        navigate("/board/gather");
        togle();
        break;
      case 3:
        navigate("/board/recap");
        togle();
        break;
      case 4:
        navigate("/board/recs");
        togle();
        break;
      case 5:
        navigate("/kikilist");
        togle();
        break;
      case 6:
        navigate("/mypage");
        togle();
        break;
      default:
    }
  };

  return (
    <nav className={active}>
      <ul className="menu">
        <li>
          <div className="m-title" onClick={() => onClickMenu(1)}>
            영화추천
          </div>
        </li>
        <li>
          <div className="m-title" onClick={() => onClickMenu(2)}>
            무비모임
          </div>
          <ul className="sub-menu">
            <li onClick={() => onClickMenu(2)}>무비모임</li>
            <li onClick={() => onClickMenu(3)}>모임후기</li>
            <li onClick={() => onClickMenu(4)}>무비추천</li>
          </ul>
        </li>
        <li>
          <div className="m-title" onClick={() => onClickMenu(5)}>
            무비키키
          </div>
        </li>
        <li>
          <div className="m-title" onClick={() => onClickMenu(6)}>
            마이페이지
          </div>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
