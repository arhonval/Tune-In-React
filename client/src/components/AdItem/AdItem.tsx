import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getAdds } from "../../redux/Thunk/getAdds";
import { patchAds } from "../../redux/Thunk/patchAds";
import { deleteAd } from "../../redux/Thunk/deleteAd";
// TODO библиотека moment.js для преобразования даты и времени.
import moment from "moment/min/moment-with-locales";

import "./AdItem.css";

export default function Ad() {
  document.title = "Oбъявление";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initState = {
    title: "",
    body: "",
    city: "",
  };

  const [value, setValue] = useState(1);
  const [newAd, setNewAd] = useState(initState);
  const [errStatus, setErrStatus] = useState(false);
  const [editAd, setEditAd] = useState(false);

  useEffect(() => {
    (function () {
      dispatch(getAdds());
    })();
  }, []);

  const params = useParams().id;
  if (isNaN(params * 1)) {
    navigate("/ads");
  }

  //-------
  const editingHandler = () => {
    setEditAd((stat) => !stat);
    setNewAd(
      (state) =>
        (state = { title: userAd.title, body: userAd.body, city: userAd.city })
    );
    setValue((val) => (val = userAd.type_id));
  };

  const inputHandler = (event) => {
    setNewAd((pre) => ({ ...pre, [event.target.name]: event.target.value }));
  };
  function chengeValue(event) {
    setValue(event.target.value);
  }
  const user = useSelector((state: any) => state.auth?.user?.data?.id);
  const userAd = useSelector((state: any) => state.adsSlice?.ads).filter(
    (el) => el.id == params
  )[0];
  const id = userAd?.id;

  return (
    <>
      <div className={editAd ? "ad-item edit" : "ad-item"}>
        <section className="section hero-text ">
          <div className="contain padding-vert-xl">
            <div className="limit limit--m">
              <h1>{userAd?.title}</h1>
            </div>
          </div>
        </section>

        <div className="col col--two-thirds">
          <div className="card">
            <div className="card__meta">
              <div className="card__location">
                <h3>Город</h3>
                {userAd?.city}
              </div>
              <div className="card__location">
                <h3>Опубликовано</h3>
                {moment(userAd?.createdAt).locale("ru").fromNow()}
              </div>
              <div className="card__location">
                <div className="sidebar__user">
                  <Link
                    to={`/profiles/${userAd?.User.login}`}
                    className="sidebar__avatar"
                  >
                    {userAd?.User.photo ? (
                      <>
                        <img src={userAd?.User.photo} alt={userAd?.User.name} />
                      </>
                    ) : (
                      <>
                        <img src="/icons/user.png" alt={userAd?.User.name} />
                      </>
                    )}
                  </Link>
                  <div className="sidebar__bio">
                    <p>{userAd?.User.name}</p>
                  </div>
                  <div id="equalizer">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card__body">
              <div>{userAd?.body}</div>
            </div>
            {userAd?.user_id === user ? (
              <>
                <div className="btn-container">
                  <button className="btn" onClick={() => editingHandler()}>
                    Редактировать
                  </button>
                  <button
                    className="btn danger"
                    onClick={() =>
                      dispatch(deleteAd({ id: id }), navigate("/ads"))
                    }
                  >
                    Удалить
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {/* AD EDIT BLOCK */}
      <div className={editAd ? "ad-edit" : "ad-edit edit"}>
        <section className="section hero-text ">
          <div className="contain padding-vert-xl">
            <div className="limit limit--m">
              <h1>Редактирование</h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="contain">
            <div className="limit limit--m">
              <div className="row">
                <div className="col col--two-thirds">
                  <div className="form">
                    <div className="radio-container">
                      <label
                        className={
                          value == "1" ? "radio-item active" : "radio-item"
                        }
                      >
                        Требуется кандидат
                        <input
                          type="radio"
                          name="radio"
                          value={1}
                          checked={value == 1 ? true : false}
                          onChange={chengeValue}
                        />
                        <span className="checkmark"></span>
                      </label>
                      <label
                        className={
                          value == "2" ? "radio-item active" : "radio-item"
                        }
                      >
                        Свободный кандидат
                        <input
                          type="radio"
                          name="radio"
                          value={2}
                          checked={value == 2 ? true : false}
                          onChange={chengeValue}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="form__row">
                      <div className="form__col">
                        <div className="form__field form__field--has-char-count js-title-field">
                          <label htmlFor="classified_title">Оглавление</label>
                          <input
                            placeholder="введите текст"
                            type="text"
                            name="title"
                            id="classified_title"
                            onChange={inputHandler}
                            value={newAd.title}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form__row">
                      <div className="form__col form__col--half">
                        <div className="form__field">
                          <label htmlFor="classified_zipcode">Город</label>
                          <input
                            placeholder="введите текст"
                            type="text"
                            name="city"
                            id="classified_zipcode"
                            onChange={inputHandler}
                            value={newAd.city}
                          />
                        </div>
                      </div>
                      <div className="form__col">
                        <div className="form__field">
                          <label htmlFor="classified_body">Текст</label>
                          <textarea
                            placeholder="Опишите все подробно..."
                            name="body"
                            id="classified_body"
                            onChange={inputHandler}
                            value={newAd.body}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-container">
                    <p className={errStatus ? "err status" : "err"}>
                      Заполните все поля !!!
                    </p>
                  </div>
                  <div className="btn-container">
                    <button
                      className="btn"
                      onClick={() =>
                        !!newAd.title && !!newAd.body && !!newAd.city
                          ? (dispatch(
                              patchAds({
                                id: params,
                                post: {
                                  ...newAd,
                                  user_id: user,
                                  type_id: value,
                                },
                              })
                            ),
                            setErrStatus((pre) => (pre = false)),
                            setEditAd((pre) => !pre))
                          : setErrStatus((pre) => !pre)
                      }
                    >
                      Сохранить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
