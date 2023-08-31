import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdds } from "../../redux/Thunk/getAdds";
// TODO библиотека moment.js для преобразования даты и времени.
import moment from "moment/min/moment-with-locales";
import "./Ad.css";
import AdsFilter from "./AdsFilter";

export default function Ad() {
  document.title = "Объявления";
  const dispatch = useDispatch();
  const userAds = useSelector((state) => state.adsSlice.ads);
  
  useEffect(() => {
    (function () {
      console.log("BBBBBBBBBBBBBBBBBBB");

      dispatch(getAdds());
    })();
  }, []);

  console.log(userAds);

  return (
    <>
      <section className="section hero-text ">
        <div className="contain padding-vert-xl">
          <div className="limit limit--m">
            <h1>Объявления</h1>
            <h2>Присоединяйтесь к группе или найдите музыканта.</h2>
            <div className="cta__inner">
              <div className="cta__submit">
                <button>
                  <Link to="/ads/new">Подать объявление</Link>
                </button>
              </div>
            </div>
          </div>
          <AdsFilter />
        </div>
      </section>
      {/* -------------- */}
      <section className="section ads">
        <div className="contain">
          <div className="limit limit--m">
            <div className="row row--desktop-reverse">
              <div className="col col--two-thirds">
                <div className="timeline">
                  {userAds.map((el) => (
                    <Link
                      to={`${el.id}`}
                      key={el.id}
                      className="timeline__item timeline__item--linked"
                    >
                      <div className="timeline__item-image">
                        {el.User.photo ? (
                          <>
                            <img src={el.User.photo} alt="Mountains of Heat" />
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={40}
                              height={40}
                              viewBox="0 0 40 40"
                            >
                              <path d="M20 0C9 0 0 9 0 20s9 20 20 20 20-9 20-20S31 0 20 0zM7.2 34c1-6.2 6.3-11 12.8-11s11.9 4.8 12.8 11c-3.4 3.1-7.9 5-12.8 5s-9.4-1.9-12.8-5zm26.5-.9C32.4 26.8 26.7 22 20 22S7.6 26.8 6.3 33.1C3 29.7 1 25.1 1 20 1 9.5 9.5 1 20 1s19 8.5 19 19c0 5.1-2 9.7-5.3 13.1z"></path>
                              <path d="M20 5c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 13c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path>
                            </svg>
                          </>
                        )}
                      </div>
                      <div className="timeline__item-content">
                        <div className="timeline__item-title">{el.title} </div>
                        <div className="timeline__item-meta sub">{el.city}</div>
                        <div className="timeline__item-meta sub">{el.body}</div>
                        <div className="timeline__item-meta">
                          {el.User.name} • {el.User.city} •{" "}
                          {moment(el.createdAt).locale("ru").fromNow()}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
