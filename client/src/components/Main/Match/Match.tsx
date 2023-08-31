import "./Match.css";

function Match() {
  return (
    <section className="section section--match" id="match">
      <div className="contain">
        <div className="limit limit--m">
          <h2>Удобный поиск</h2>
          <p>
            Продвинутая система поиска по местоположению, доступности,
            инструменту или жанру.
          </p>
        </div>
      </div>
      <div className="floating-profiles">
        <div className="contain">
          <div className="limit limit--m">
            <div className="listing">
              <div className="listing__item js-listing-item">
                <a>
                  <div
                    className="listing__image"
                    style={{
                      backgroundImage:
                        "url(https://s3.amazonaws.com/hendrix-prod/images/images/000/000/408/square/profile.jpg?1512787708)",
                    }}
                  ></div>
                  <div className="listing__info">
                    <div className="listing__text">
                      <div className="listing__name">
                        <span
                          className="js-listing-name"
                          data-original="Instrumental Asylum"
                        >
                          Instrumental Asylum
                        </span>
                      </div>
                      <div className="listing__meta">Producer</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="listing__item js-listing-item">
                <a>
                  <div
                    className="listing__image"
                    style={{
                      backgroundImage:
                        "url(https://s3.amazonaws.com/hendrix-prod/images/images/000/000/118/square/Glass_Tactics_1_%C2%A9_Sonny_Shaikh-min.jpg?1489522298)",
                    }}
                  ></div>
                  <div className="listing__info">
                    <div className="listing__text">
                      <div className="listing__name">
                        <span
                          className="js-listing-name"
                          data-original="Glass Tactics"
                        >
                          Glass Tactics
                        </span>
                      </div>
                      <div className="listing__meta">Musician</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="listing__item js-listing-item">
                <a>
                  <div
                    className="listing__image"
                    style={{
                      backgroundImage:
                        "url(https://s3.amazonaws.com/hendrix-prod/images/images/000/000/061/square/Ifrolix_band.JPG?1482335317)",
                    }}
                  ></div>
                  <div className="listing__info">
                    <div className="listing__text">
                      <div className="listing__name">
                        <span
                          className="js-listing-name"
                          data-original="Ifrolix Band"
                        >
                          Ifrolix Band
                        </span>
                      </div>
                      <div className="listing__meta">Musician</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="listing__item js-listing-item">
                <a>
                  <div
                    className="listing__image"
                    style={{
                      backgroundImage:
                        "url(https://s3.amazonaws.com/hendrix-prod/images/images/000/000/029/square/Press_Photo_Heartbeat.jpg?1471465886)",
                    }}
                  ></div>
                  <div className="listing__info">
                    <div className="listing__text">
                      <div className="listing__name">
                        <span
                          className="js-listing-name"
                          data-original="Cecilie Beck"
                        >
                          Cecilie Beck
                        </span>
                      </div>
                      <div className="listing__meta">Band</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Match;
