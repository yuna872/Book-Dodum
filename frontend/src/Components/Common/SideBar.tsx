import React, { useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSelectorTyped from "../../Store";
import styled from "styled-components";
import logo from "../../Assets/Images/logo-black.png";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { persistor } from "../../index";

// 타입 선언
type Props = {
  sideMenu: boolean;
  hideSideMenu: () => void;
};

// 컴포넌트 정의
export default function SideBar({ sideMenu, hideSideMenu }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = useSelectorTyped((state) => state.user.name);
  const token = window.localStorage.getItem('user')

  const logout = () => {
    let really = window.confirm('정말 로그아웃 하시겠어요?');
    if(really) {
      localStorage.removeItem("user");
      window.alert("로그아웃 되었습니다.");
      persistor.purge();
      navigate('/intro')
    }
  };

  useEffect(() => {
  }, )

  return (
    <Container>
      <BackGround
        className={sideMenu ? "open" : ""}
        onClick={() => hideSideMenu()}
      />
      <Bar
        className={sideMenu ? "open" : ""}
        onClick={() => hideSideMenu()}
      >
        <Wrap>
          <Logo>
            <BookOpenIcon width="40px" strokeWidth="0.5px" color="#5C5649" />
            <LogoImg>
              <img src={logo} width="70px" height="35px" />
            </LogoImg>
          </Logo>
          {!token ? (
            <LoginBtn onClick={() => navigate("/login")}>
              <TextTop>북,돋움 해보기</TextTop>
              <TextBottom>로그인/회원가입</TextBottom>
            </LoginBtn>
          ) : (
            <LoginBtn>
              <TextTop>{nickname}님, 반가워요</TextTop>
              <TextBottom onClick={logout}>로그아웃</TextBottom>
            </LoginBtn>
          )}
          <Menus>
            <Menu
              className={location.pathname === "/" ? "selected" : ""}
              onClick={() => {
                navigate("/");
                hideSideMenu();
              }}
            >
              <MenuText>홈</MenuText>
            </Menu>
            <Menu
              className={location.pathname === "/bookmeeting" ? "selected" : ""}
              onClick={() => {
                navigate("/bookmeeting");
                hideSideMenu();
              }}
            >
              <MenuText>독서모임</MenuText>
            </Menu>
            {token && (
              <Menu
                className={location.pathname === "/mypage" ? "selected" : ""}
                onClick={() => {
                  navigate("/mypage");
                  hideSideMenu();
                }}
              >
                <MenuText>내 책방</MenuText>
              </Menu>
            )}
          </Menus>
        </Wrap>
      </Bar>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  position: relative;
  background-color: #f7f3eb;

` 
const Bar = styled.div` 
  position: fixed;
  z-index: 5;
  height: 100%;
  left: -250%;
  top: 0;
  transition: 0.5s ease;
  &.open {
    left: 0;
    transition: 0.5s ease;
  }
  background-color: #f7f3eb;
  width: 250px;
`;

const BackGround = styled.div`
  &.open {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
    width: 100vw;
    height: 100%;
    background-color: black;
    opacity: 60%;
  }
`;

const Wrap = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;
const Logo = styled.div`
  display: flex;
  margin: 20% 0 15% 5%;
`;

const LogoImg = styled.div`
  width: 70px;
  margin-left: 3%;
`;

const LoginBtn = styled.div`
  width: 100%;
  height: 64px;
  background-color: #5c5649;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 10% 0;
`;
const Menus = styled.div`
  padding: 5% 0;
  border-top: 0.2px solid #979591;
  border-bottom: 0.2px solid #979591;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Menu = styled.div`
  width: 95%;
  height: 35px;
  color: #5c5649;
  border-radius: 35px;
  margin: 3% 0;
  display: flex;
  align-items: center;
  &.selected {
    background-color: #e4ddcc;
  }
`;

const MenuText = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-left: 10%;
`;
const TextTop = styled.div`
  color: #ffffff;
  font-weight: bold;
  padding-left: 8%;
  font-size: 16px;
`;
const TextBottom = styled.div`
  color: #ffffff;
  padding-left: 8%;
  margin-top: 2%;
  font-size: 12px;
`;

