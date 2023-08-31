import "./Advertisement.css";

function Advertisement() {
  return (
    <section className="section section--shows" id="shows">
      <div className="contain">
        <div className="limit limit--m">
          <div className="duo">
            <div className="duo__item">
              <div className="feature">
                <h2>Публикация объявлений</h2>
                <p>
                  Басист пропал или заболели в последний момент? Воспользуйтесь
                  Tune-in, чтобы найти профессионала (или любителя), который
                  сможет заменить Вас на выступлении или присоединиться к вашей
                  группе на постоянной основе.
                  <br className="desktop-break" />
                </p>
              </div>
            </div>
            <div className="duo__item">
              <div className="show-poster">
                <img src="/keep-min.gif" alt="keep-min" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Advertisement;
