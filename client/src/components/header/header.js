import { Link, useNavigate } from 'react-router-dom';
import "./header.css";
import { API_URL } from '../config/contansts';
import axios from "axios"
import { getCookie, removeCookie } from '../../useCookies';
import subway1 from "../header/subway1.png";

function Header() {
const navigate = useNavigate();

  const Logout = (e)=>{
    e.preventDefault()
    removeCookie('user')
    removeCookie('role')
    navigate("/")
    window.location.reload();
  }

const Login = (e) => {
  e.preventDefault()
  if(getCookie('user')){
    navigate("/order/Fast-Sub/step1/Noplace/Null/Nan")
  } else {
    navigate("/login")
  }
}

  return (
    <div className="header">
      {/* <button onClick={test}>등록</button> */}
      <div className="topheader">
        <Link to="/"><img src={subway1}></img></Link>
        { getCookie('user') ? 
          <div className="util_menu">
            <button style={{cursor: "pointer"}}><a onClick={Logout}>로그아웃</a></button>&nbsp;&nbsp;
            <button><a href="/mypage/none">마이페이지</a></button>

          </div>
          :
          <div className="util_menu">
            <button><a href="/login">로그인</a></button>&nbsp;&nbsp;
            <button><a href="/register">회원가입</a></button>
          </div>
        }
      </div>
      <ul className="menu">
        <li className="menu-item">
          <Link to="/menuIntro/0">메뉴소개</Link>
            <ul className="submenu">
              <Link to="/menuIntro/0"><li>샌드위치</li></Link>
              <Link to="/menuIntro/1"><li>랩 · 기타</li></Link>
              <Link to="/menuIntro/2"><li>샐러드</li></Link>
              <Link to="/menuIntro/3"><li>아침메뉴</li></Link>
              <Link to="/menuIntro/4"><li>스마일 썹</li></Link>
              <Link to="/menuIntro/5"><li>단체메뉴</li></Link>
            </ul>
        </li>
        <li className="menu-item">
          <Link to="/ingreDient/howtousesubway">이용방법</Link>
            <ul className="submenu">
              <Link to="/ingreDient/howtousesubway"><li>써브웨이 이용방법</li></Link>
              <Link to="/ingreDient/groupmenu"><li>단체메뉴 이용방법</li></Link>
              <Link to="/ingreDient/freshingredients"><li>신선한 재료 소개</li></Link>
            </ul>
        </li>
        <li className="menu-item">
          <Link to="/newsPage/Event">새소식</Link>
            <ul className="submenu">
              <Link to="/newsPage/Event"><li>이벤트 · 프로모션</li></Link>
              <Link to="/newsPage/Notice"><li>뉴스 · 공지사항</li></Link>
              <Link to="/newsPage/Advertising"><li>광고영상</li></Link>
            </ul>
        </li>
        <li className="menu-item">
          <Link to="/History">써브웨이</Link>
            <ul className="submenu">
              <Link to="/History"><li>써브웨이 역사</li></Link>
              <Link to="/Promise"><li>써브웨이 약속</li></Link>
              <Link to="/Apply"><li>아티스트 지원</li></Link>
              <Link to="/StoreSearch"><li>매장찾기</li></Link>
            </ul>
        </li>
        <li className="menu-item">
          <Link to="/franchise/subwayfranchise">가맹점</Link>
          <ul className="submenu">
            <li><Link to="/franchise/subwayfranchise">프랜차이즈</Link></li>
            <li><Link to="/franchise/faq">가맹관련 FAQ</Link></li>
            <li><Link to="/franchise/franchiseinquire">가맹신청 문의</Link></li>
            <li><Link to="/franchise/branchinformation">지사안내</Link></li>
            <li><Link to="/franchise/briefing">사업설명회</Link></li>
          </ul>
        </li>
        <li className="menu-item">
          <Link>온라인 주문</Link>
            <ul className="submenu" style={{width: "100%"}}>
              <li onClick={Login}>FAST-SUB</li>
            </ul>
        </li>
      </ul>
    </div>
  );
}

export default Header;