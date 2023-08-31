import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Intro.css";

function Intro() {
  const typesUsers = useSelector((state) => state.newUserProfile.userTypes);

  return (
    <section className="section section--intro">
      <div class="muzieknootjes">
        <div class="noot-1">&#9835; &#9833;</div>
        <div class="noot-2">&#9833;</div>
        <div class="noot-3">&#9839; &#9834;</div>
        <div class="noot-4">&#9839; &#9834;</div>
        <div class="noot-5">&#9839;&#9833; &#9834;</div>
        <div class="noot-6">&#9835;&#9835;</div>
      </div>
      <div className="contain">
        <div className="limit limit--m">
          <div className="logo">
            <img src="/tune-in .png" alt="" />
          </div>
          <h1>
            Создайте Группу
            <br />
            Творите Музыку
          </h1>
        </div>
        <div className="cta form">
          <div action="/users/join" className="js-cta-form">
            <div className="cta__inner">
              <div className="cta__select">
                <div className="select">
                  <select name="profile_type_id" id="profile_type_id">
                    {typesUsers.map((el, i) => (
                      <option key={i} value={i++}>
                        {el}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="cta__submit">
                <button>
                  <Link to="/register">Погнали!</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
