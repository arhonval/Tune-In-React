import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postAds } from "../../redux/Thunk/postAds";

import "./AdNew.css";

export default function AdNew() {
  document.title = "Новое объявление";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initState = {
    title: "",
    body: "",
    city: "",
  };

  const user = useSelector((state) => state.auth.user?.data?.id);
  const [value, setValue] = useState(1);
  const [newAd, setNewAd] = useState(initState);
  const [errStatus, setErrStatus] = useState(false);

  const inputHandler = (event) => {
    setNewAd((pre) => ({ ...pre, [event.target.name]: event.target.value }));
  };
  function chengeValue(event) {
    setValue(event.target.value);
  }
  return (
    <>
      <section className="section hero-text ">
        <div className="contain padding-vert-xl">
          <div className="limit limit--m">
            <h1>Новое объявление</h1>
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
                      Ищу музыканта
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
                      Ищу группу
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
                        <label htmlFor="classified_title">
                          Название объявления
                        </label>
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
                        ? dispatch(
                            postAds({ ...newAd, user_id: user, type_id: value })
                          ).then(() => navigate("/ads"))
                        : setErrStatus((pre) => !pre)
                    }
                  >
                    Готово
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
