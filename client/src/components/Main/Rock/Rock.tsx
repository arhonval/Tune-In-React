import "./Rock.css";

function Rock() {
  return (
    <section className="section section--rock" id="rock-on">
      <div className="contain">
        <div className="limit limit--m">
          <div className="duo">
            <div className="duo__item">
              <div className="feature">
                <h2>Зажги!</h2>
                <p>
                  Познакомьтесь с новыми музыкантами, создавайте группы,
                  проводите концерты, повышайте свой уровень, будьте в центре
                  внимания. Ваш профиль — это только начало.
                </p>
              </div>
            </div>
            <div className="duo__item">
              <div className="rock-on-animation">
                <img src="/rock-on-animation-ff0e818fbce72ba893a3ead5cadeaee49a86023ba199955533d7f3e96b9b005c.gif" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Rock;
