import "./Meet.css";

function Meet() {
  return (
    <section className="section section--light section--meet" id="meet">
      <div className="contain">
        <div className="limit limit--m">
          <div className="duo duo--reverse">
            <div className="duo__item">
              <div className="feature">
                <h2>В поисках группы или музыканта?</h2>
                <p>
                  Участники Tune-in получают бесплатный доступ к самому
                  быстрорастущему сообществу музыкантов в России.
                </p>
                <iframe
                  src="https://www.youtube.com/embed/dF9JXK34m3M"
                  title="Classic Rock Songs 70s 80s 90s Full Album - Queen, Eagles, Pink Floyd, Def Leppard, Bon Jovi"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p className="home-footnote">(нажми для просмотра видео)</p>
              </div>
            </div>
            <div className="duo__item">
              <div className="usermap">
                <img
                  src="/russia.svg"
                  width="500px"
                  height="315px"
                  className="usermap__map"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Meet;
