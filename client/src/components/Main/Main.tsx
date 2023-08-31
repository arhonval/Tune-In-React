import Intro from "./Intro/Intro";
import Meet from "./Meet/Meet";
import Match from "./Match/Match";
import Advertisement from "./Advertisement/Advertisement";
import Rock from "./Rock/Rock";
import Support from "./Support/Support";

import "./Main.css";
// is-triggered is-visible
function Main() {
  return (
    <>
      <Intro />
      <Meet />
      <Match />
      <Advertisement />
      <Rock />
      <Support />
      <Intro />
    </>
  );
}

export default Main;
