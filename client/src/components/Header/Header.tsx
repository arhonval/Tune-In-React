import React, { useEffect } from "react";
import { Link, useNavigate, NavigateFunction } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/Thunk/getLogoutUser";
import { fetchUserTypes } from "../../redux/Thunk/CreateProfile/getUserTypes";
import "./Header.css";
import { checkUser } from "../../redux/Thunk/checkUser";
import { clearBand } from "../../redux/band.slice";
// is-triggered is-visible

function Header() {
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const currentPath = window.location.pathname;

  useEffect(() => {
    dispatch(fetchUserTypes());
  }, []);

  const auth = useSelector((state) => state.auth?.authUser);
  const user = useSelector((state) => state.auth.user?.data);

  const profileHandler = (e) => {
    e.preventDefault();
    dispatch(clearBand({}));
    navigate(`/profiles/${user?.login}`);
  };

  const logoutHandler = async (e) => {
    e.preventDefault();
    await dispatch(logoutUser());
    if (currentPath !== "/") {
      navigate("/");
    }
  };

  // console.log(types);

  return (
    <header className="header">
      <div className="header__mobile-nav">
        <div className="header__mobile-nav-trigger">Меню</div>
        <ul className="mobile-nav-menu one menu menu--center menu--l">
          {auth ? (
            <>
              <li className={currentPath != "/" ? "" : "edit"}>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/profiles">Профили</Link>
              </li>
              <li>
                <Link to="/ads">Объявления</Link>
              </li>
              <li>
                <Link to="/bands">Группы</Link>
              </li>
            </>
          ) : (
            <>
              {" "}
              <li className={currentPath != "/" ? "" : "edit"}>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/profiles">Профили</Link>
              </li>
              <li>
                <Link to="/ads">Объявления</Link>
              </li>
              <li>
                <Link to="/bands">Группы</Link>
              </li>
              <li>
                <Link to="/login">Войти</Link>
              </li>
              <li>
                <Link to="/register">Регистрация</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="header__desktop-nav">
        <ul className="desktop-nav">
          {auth ? (
            <>
              {" "}
              <li className={currentPath != "/" ? "" : "edit"}>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/profiles">Профили</Link>
              </li>
              <li>
                <Link to="/ads">Объявления</Link>
              </li>
              <li>
                <Link to="/bands">Группы</Link>
              </li>
            </>
          ) : (
            <>
              <li className={currentPath != "/" ? "" : "edit"}>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/profiles">Профили</Link>
              </li>
              <li>
                <Link to="/ads">Объявления</Link>
              </li>
              <li>
                <Link to="/bands">Группы</Link>
              </li>
              <li>
                <Link to="/login">Войти</Link>
              </li>
              <li>
                <Link to="/register">Регистрация</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <Link className="badge" to="/">
        <img src="/ti-logo.gif" alt="" />
      </Link>
      <div className="user-nav js-user-nav">
        <div className="user-nav__icon js-menu-trigger is-triggered">
          {user?.photo ? (
            <img src={user.photo} />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
            >
              <path d="M20 0C9 0 0 9 0 20s9 20 20 20 20-9 20-20S31 0 20 0zM7.2 34c1-6.2 6.3-11 12.8-11s11.9 4.8 12.8 11c-3.4 3.1-7.9 5-12.8 5s-9.4-1.9-12.8-5zm26.5-.9C32.4 26.8 26.7 22 20 22S7.6 26.8 6.3 33.1C3 29.7 1 25.1 1 20 1 9.5 9.5 1 20 1s19 8.5 19 19c0 5.1-2 9.7-5.3 13.1z"></path>
              <path d="M20 5c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 13c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path>
            </svg>
          )}
        </div>
        <ul className="user-nav__menu menu two menu--right menu--l js-menu">
          {auth ? (
            <>
              <li>
                <Link onClick={profileHandler}>Профиль</Link>
              </li>
              <li>
                <Link to="/chat">Сообщения</Link>
              </li>
              <li>
                <Link to="/settings">Настройки</Link>
              </li>
              <li>
                <Link onClick={logoutHandler}>Выйти</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Войти</Link>
              </li>
              <li>
                <Link to="/register">Регистрация</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
